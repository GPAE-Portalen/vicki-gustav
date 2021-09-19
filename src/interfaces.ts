export interface IDictionary<T> {
    [key: string]: T;
}

export interface IRecipePost {
    title: string;
    date: Date;
    image: string;
    description: string;
    ingridients: string[];
    process: string[];
    updatedAt: Date;
}