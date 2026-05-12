import { cn } from "@/lib/utils";
import iconUrl from "@/Icono.svg";

type ServelLogoProps = {
  className?: string;
};

const ServelLogo = ({ className }: ServelLogoProps) => {
  return (
    <img src={iconUrl} alt="Servel" className={cn("h-8 w-8", className)} />
  );
};

export default ServelLogo;
