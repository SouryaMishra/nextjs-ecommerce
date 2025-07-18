"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const itemInCart = cart.items.find((item) => item.productId === productId);

  if (itemInCart) {
    // Relation query to update the cart item over the cart model.
    // This ensures the updatedAt timestamp of a cart to be updated when its cart item is updated.
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: { id: itemInCart.id },
            data: { quantity: { increment: 1 } },
          },
        },
      },
    });

    // await prisma.cartItem.update({
    //   where: { id: itemInCart.id },
    //   data: { quantity: { increment: 1 } },
    // });
  } else {
    // Relation query to create the cart item over the cart model.
    // This ensures the updatedAt timestamp of a cart to be updated when its cart item is created.
    // No need to pass cart id when creating a cart item as it will be automatically handled by the relation query
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            productId,
            quantity: 1,
          },
        },
      },
    });

    // await prisma.cartItem.create({
    //   data: {
    //     cartId: cart.id,
    //     productId,
    //     quantity: 1,
    //   },
    // });
  }

  revalidatePath("/products/[id]");
}
