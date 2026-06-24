# Database & 환경변수 워크플로우

이 프로젝트는 **Drizzle ORM + Turso(libsql)** 를 사용합니다.

- **로컬**: 파일 기반 SQLite (`file:./db.sqlite`)
- **운영**: 원격 Turso DB (`libsql://...`)

로컬과 운영은 **물리적으로 분리된 별개 DB**입니다. 데이터는 서로 섞이지 않으며, 한쪽을 건드려도 다른 쪽에 영향이 없습니다. 다만 **스키마(테이블 구조)는 양쪽을 동일하게 맞춰야** 합니다.

스키마 변경은 마이그레이션 파일 없이 `drizzle-kit push`(스키마 직접 동기화) 방식으로 적용합니다.

---

## 처음 클론했을 때 (로컬 1회 셋업)

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 파일 생성 후 값 채우기
cp .env.local.example .env.local

# 3. 어드민 비밀번호 해시 생성 → 출력된 해시를 .env.local 의 ADMIN_PASSWORD_HASH 에 입력
npm run password:hash

# 4. 로컬 DB 에 스키마 생성 + 샘플 글 시드
npm run db:setup

# 5. 개발 서버 실행
npm run dev
```

> `.env.local` 에서 DB 관련 값(`TURSO_DATABASE_URL=file:./db.sqlite`)은 그대로 두면 됩니다.
> `JWT_SECRET`, `CLOUDINARY_*` 등 나머지 값도 example 파일의 안내에 따라 채워주세요.

---

## 운영(Vercel)에 스키마 반영하기

운영 앱의 환경변수는 **Vercel 대시보드**에서 관리합니다. 아래 작업은 오직 **로컬에서 운영 Turso DB 에 스키마를 적용**할 때만 필요합니다.

`schema.ts` 를 수정했다면 로컬과 운영 **둘 다에** 반영해야 합니다.

```bash
# 1. (최초 1회) 운영 DB 접속 정보 파일 생성 후 URL·토큰 입력
cp .env.production.local.example .env.production.local

# 2. 로컬에 먼저 반영하고 확인
npm run db:push

# 3. 확인되면 운영 DB 에 동일하게 반영
npm run db:push:prod
```

> `.env.production.local` 의 값은 Vercel 에 설정한 `TURSO_DATABASE_URL`(libsql://...)·`TURSO_AUTH_TOKEN` 과 동일하게 채웁니다.

---

## npm 스크립트 정리

| 스크립트 | 대상 | 설명 |
| --- | --- | --- |
| `npm run dev` | - | 개발 서버 실행 |
| `npm run db:setup` | 로컬 | 스키마 push + 시드 (클론 후 1회) |
| `npm run db:push` | 로컬 | `schema.ts` 를 로컬 DB 에 반영 |
| `npm run db:push:prod` | 운영 | `schema.ts` 를 운영 Turso DB 에 반영 |
| `npm run db:seed` | 로컬 | 샘플 글 주입 (기존 글 삭제 후 재생성) |
| `npm run db:studio` | 로컬 | Drizzle Studio (DB GUI) 실행 |
| `npm run password:hash` | - | 어드민 비밀번호 해시 생성 |

모든 `db:*` 스크립트는 `dotenv-cli` 로 적절한 env 파일(`.env.local` 또는 `.env.production.local`)을 자동으로 읽으므로, 별도로 환경변수를 앞에 붙일 필요가 없습니다.

---

## 환경변수 파일 규칙

| 파일 | 용도 | git |
| --- | --- | --- |
| `.env.local.example` | 로컬 개발용 템플릿 | ✅ 커밋 |
| `.env.production.local.example` | 운영 DB push용 템플릿 | ✅ 커밋 |
| `.env.local` | 로컬 실제 값 | 🚫 gitignore |
| `.env.production.local` | 운영 DB 실제 값 | 🚫 gitignore |

실제 값이 담긴 파일(`*.local`)과 DB 파일(`db.sqlite` 등)은 gitignore 되어 **커밋되지 않습니다.** 운영 DB 로 로컬 데이터가 올라갈 일은 없습니다.

---

## 참고

- 스키마 정의: `drizzle/schema.ts` (앱이 직접 import — 절대 삭제/ignore 금지)
- Drizzle 설정: `drizzle.config.ts`
- 마이그레이션 폴더(`drizzle/migrations/`)는 `push` 방식만 사용하므로 gitignore 처리되어 있습니다.
