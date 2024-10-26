export type Blog = {
    _id: string;
    title: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    imageUrl: string;
}