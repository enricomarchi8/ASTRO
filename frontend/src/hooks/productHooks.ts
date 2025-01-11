import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Product";

export const useGetProductsQuery = () =>
    useQuery({
        queryKey: ['products'],
        queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
    })

export const useGetProductDetailsBySlugQuery = (slug: string) =>
    useQuery({
        queryKey: ['products', slug],
        queryFn: async () =>
        (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
    })

export const useCreateProductMutation = () => useMutation({
    mutationFn:async (product: {
        nome: string
        slug: string
        immagine: string
        marca: string
        categoria: string
        descrizione: string
        prezzo: number
        disponibilita: number
        valutazione: number
        numRecensioni: number
    }) =>
        (
            await apiClient.post<{ message: string; product: Product }>(
                `api/products`,
                product
            )
        ).data,
})

export const useUpdateProductMutation = () => useMutation({
    mutationFn:async (product: {
        _id: string
        nome: string
        slug: string
        immagine: string
        marca: string
        categoria: string
        descrizione: string
        prezzo: number
        disponibilita: number
        valutazione: number
        numRecensioni: number
    }) =>
    (
        await apiClient.put<{ message: string; product: Product}>(
            `api/products/${product._id}`,
            product
        )
    ).data,
})

export const useDeleteProductMutation = () => useMutation({
    mutationFn: async (productId: string) =>
        (await apiClient.delete<{ message: string }>(`api/products/${productId}`)).data,
})
