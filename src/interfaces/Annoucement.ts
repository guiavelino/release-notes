import { CategoryProps } from "./Category";

export interface AnnoucementProps {
    id: number;
    title: string;
    description: string;
    cover: string;
    categories: CategoryProps[];
    createdAt: string;
};
