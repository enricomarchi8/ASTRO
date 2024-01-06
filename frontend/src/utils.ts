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