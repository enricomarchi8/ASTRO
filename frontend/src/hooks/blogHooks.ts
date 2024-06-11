import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Blog } from "../types/Blog";

export const useGetPostsQuery = () =>
    useQuery({
        queryKey: ['blogs'],
        queryFn: async () => (await apiClient.get<Blog[]>(`api/blogs`)).data,
    })

export const useGetPostDetailsByIdQuery = (id: string) =>
    useQuery({
        queryKey: ['blogs', id],
        queryFn: async () =>
        (await apiClient.get<Blog>(`api/blogs/${id}`)).data,
    })