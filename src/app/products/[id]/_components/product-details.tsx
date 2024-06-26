"use client";

import Image from "next/image";
import { Prisma } from "@prisma/client";
import DiscountBadge from "@/_components/discount-badge";
import { calculateProductTotalPrice, formatCurrency } from "@/_helpers/price";
import { Button } from "@/_components/ui/button";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import { useState } from "react";
import { Card } from "@/_components/ui/card";
import ProductList from "@/_components/product-list";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () => setQuantity((prev) => prev + 1);

  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });

  return (
    <div className="relative z-50 -mt-6 rounded-t-3xl bg-white py-5">
      {/* Nome do Restaurant */}
      <div className="flex items-center gap-1.5 px-5">
        <div className="relative h-6 w-6">
          <Image
            fill
            className="rounded-full object-cover"
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      {/* Nome do Produto */}
      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      {/* Preço do produto e quantidade */}
      <div className="flex justify-between px-5">
        <div className="">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>

            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            {`De: ${formatCurrency(Number(product.price))}`}
          </p>
        </div>

        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDecreaseQuantityClick}
            className="border border-muted-foreground hover:bg-muted-foreground/20"
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuantityClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* Dados da Entrega */}
      <div className="px-5">
        <Card className="mt-6 flex justify-around py-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {`${Number(product.restaurant.deliveryTime / 1000 / 60)} min`}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 drop-shadow-2xl">
        <Button className="w-full font-semibold">Adicionar à Sacola</Button>
      </div>
    </div>
  );
};

export default ProductDetails;
