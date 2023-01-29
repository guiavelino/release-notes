import { AuthorProps } from "./Author";
import { TopicProps } from "./Topic";
import { StatusProps } from "./Status";
import { CommentProps } from "./Comment";

export interface IdeaProps {
    id: number;
    title: string;
    description: string;
    author: AuthorProps;
    topics: TopicProps[];
    status: StatusProps;
    comments: CommentProps[];
    voteCount: number;
    commentCount: number;
    createdAt: string;
};

