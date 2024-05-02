import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between px-5 pt-6">
      <Image src="/fswfood.svg" width={100} height={30} alt="FSW Foods" />

      <Button size="icon" variant="ghost">
        <MenuIcon />
      </Button>
    </header>
  );
};

export default Header;
