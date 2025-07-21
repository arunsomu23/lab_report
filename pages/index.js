import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Home() {
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/lab");
  };

  return (
    <MainLayout>
      <div className="p-4">
        <Breadcrumbs items={[]} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <Card onClick={handleCardClick} />
        </div>
      </div>
    </MainLayout>
  );
}
