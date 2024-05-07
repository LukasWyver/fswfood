import { formatCurrency } from "@/_helpers/price";
import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="min-w-[266px] max-w-[266px] space-y-3">
      <div className="relative h-[136px] w-full">
        <Image
          fill
          alt={restaurant.name}
          src={restaurant.imageUrl}
          className="rounded-lg object-cover shadow-md"
        />

        <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full bg-white px-2 py-0.5">
          <StarIcon size={12} className="fill-[#ffb100] stroke-[#ffb100]" />
          <span className="text-xs font-semibold">5.0</span>
        </div>

        <Button
          size="icon"
          className="group absolute right-2 top-2 h-7 w-7 rounded-full border border-white/20 bg-white/20 drop-shadow-md backdrop-blur-sm"
        >
          <HeartIcon size={16} className="fill-white stroke-white" />
        </Button>
      </div>
      <div className="">
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <BikeIcon className="stroke-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega Grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TimerIcon className="stroke-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {`${restaurant.deliveryTime / 1000 / 60} min`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
