export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      {/* Header/Footer will be added in MS2 */}
      <main className="py-16">{children}</main>
    </div>
  );
}
