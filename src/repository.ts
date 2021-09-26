import { 
    IDictionary,
    IRecipePost
 } from './interfaces';

export interface IRepository {
    getRecipePosts(): IDictionary<IRecipePost>;
}

export default class Repository implements IRepository {
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    getRecipePosts(): IDictionary<IRecipePost> {
        const recipePosts: IDictionary<IRecipePost> = require(`${this.url}recipes.json`);

        return recipePosts;
    }
}