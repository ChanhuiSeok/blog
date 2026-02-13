import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <Header />
      <main className="py-12">{children}</main>
      <Footer />
    </div>
  );
}
