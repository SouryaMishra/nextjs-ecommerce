import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface IProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: IProductCardProps) {
  const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7; // i.e. 7 days

  return (
    <Link href={"/products/" + product.id} className="card w-full bg-base-100 transition hover:shadow-xl">
      <figure>
        <Image src={product.imageUrl} alt={product.name} width={800} height={400} className="h-40 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {isNew && <div className="badge badge-secondary">NEW</div>}
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
}
