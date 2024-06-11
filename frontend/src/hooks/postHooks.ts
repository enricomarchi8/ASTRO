import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Blog } from "../types/Blog";

export const useGetPostsQuery = () =>
    useQuery({
        queryKey: ['blogs'],
        queryFn: async () => (await apiClient.get<Blog[]>(`api/blogs`)).data,
    })

export const useGetProductDetailsBySlugQuery = (slug: string) =>
    useQuery({
        queryKey: ['products', slug],
        queryFn: async () =>
        (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
    })