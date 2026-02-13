type Params = Promise<{ id: string }>;

export default async function EditPostPage({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <section>
      <h1 className="text-3xl font-bold">Edit Post: {id}</h1>
    </section>
  );
}
