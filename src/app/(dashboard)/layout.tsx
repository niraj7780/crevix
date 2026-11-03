import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="w-full pt-16 px-8 py-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
