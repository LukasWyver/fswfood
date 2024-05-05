import CategoryList from "@/_components/category-list";
import Header from "@/_components/header";
import ProductList from "@/_components/product-list";
import Search from "@/_components/search";
import { Button } from "@/_components/ui/button";
import { db } from "@/_lib/prisma";
import { ChevronRightIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
};

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner.png"
          alt="Até 30% de desconto em pizzas"
          className="h-auto w-full object-contain"
          sizes="100vh"
          quality={100}
          height={0}
          width={0}
        />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>

        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;
