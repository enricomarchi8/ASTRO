import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Comment } from "../types/Comment";


export const useGetCommentsQuery = () =>
    useQuery({
        queryKey: ['comments'],
        queryFn: async () => (await apiClient.get<Comment>(`api/comments`)).data,
    })

export const useGetCommentDetailsByIdQuery = (id: string) =>
    useQuery({
        queryKey: ['comments', id],
        queryFn: async () =>
        (await apiClient.get<Comment>(`api/comments/${id}`)).data,
    })