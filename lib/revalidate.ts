import { revalidatePath } from "next/cache";
import { CATEGORY_VALUES } from "@/types";

/**
 * 글이 추가·수정·삭제되면 해당 글이 노출되는 정적 경로를 즉시 무효화한다.
 * (홈의 최근 글 5개, 블로그 목록, 카테고리 목록, 상세 페이지)
 *
 * 카테고리는 수정으로 바뀔 수 있어 전체를 무효화한다.
 */
export function revalidatePost(slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/blog");
  for (const category of CATEGORY_VALUES) {
    revalidatePath(`/blog/category/${category}`);
  }
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}
