import { ApiError } from './types/ApiError'
import { CartItem } from './types/Cart'
import { Product } from './types/Product'

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export const convertProductToCartItem = (product: Product) : CartItem => {
  const CartItem: CartItem = {
    _id: product._id,
    name: product.nome,
    slug: product.slug,
    image: product.immagine,
    price: product.prezzo,
    countInStock: product.disponibilita,
    quantity: 1,
  }
  return CartItem
}

export const getRandomItems = <T>(items: T[], count: number): T[] => {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const calcPriceTaxed = (price: number, tax: number = 0.22): number => {
  return Math.round(price * (1 + tax) * 100) / 100; // Arrotondamento a due decimali
}