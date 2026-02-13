export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin sidebar will be added in MS7 */}
      <main className="p-8">{children}</main>
    </div>
  );
}
