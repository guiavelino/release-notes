import { AuthorProps } from "./Author";

export interface CommentProps {
    id: number;
    author: AuthorProps;
    content: string;
    createdAt: string;
}