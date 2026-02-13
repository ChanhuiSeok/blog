import dynamic from "next/dynamic";

const PostEditor = dynamic(
  () =>
    import("@/components/admin/PostEditor").then((mod) => mod.PostEditor),
  {
    loading: () => (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-sm text-muted-foreground">에디터 로딩 중...</p>
      </div>
    ),
  },
);

export default function NewPostPage() {
  return <PostEditor />;
}
