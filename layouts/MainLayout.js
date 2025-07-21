import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />
      <Menu />
      <main role="main" className="flex-grow container max-w-7xl mx-auto p-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
