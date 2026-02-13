type Params = Promise<{ slug: string }>;

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;

  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight">Post: {slug}</h1>
    </article>
  );
}
