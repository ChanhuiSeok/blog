import { revalidatePath } from "next/cache";

/**
 * 글이 추가·수정·삭제되면 해당 글이 노출되는 정적 경로를 즉시 무효화한다.
 * (홈의 최근 글 5개, 블로그 목록, 상세 페이지)
 */
export function revalidatePost(slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/blog");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}
