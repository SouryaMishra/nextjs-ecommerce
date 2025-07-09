import { formatPrice } from "@/lib/format";

interface IPriceTagProps {
  price: number;
  className?: string;
}

export default function PriceTag({ price, className }: IPriceTagProps) {
  return <span className={`badge ${className}`}>{formatPrice(price)}</span>;
}
