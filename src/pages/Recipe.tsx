import React, { Suspense, useState, useEffect, Fragment } from 'react';
import { Route, RouteComponentProps, Switch, Redirect } from 'react-router-dom';

import { IDictionary, IRecipePost } from '../interfaces';

interface IRecipeRouteProps {
    recipeName: string;
};

export default function Recipe(props: RouteComponentProps<IRecipeRouteProps>) {
    const [recipeDict, setRecipeDict] = useState<IDictionary<IRecipePost>>();
    const [recipe, setRecipe] = useState<IRecipePost>();
    const [render, setRender] = useState<boolean>(false);
    const [isNotFound, setIsNotFound] = useState<boolean>(false);

    useEffect(() => {
        if (!recipeDict) {
            const data = require(`../data/recipes.json`);
            setRecipeDict(data);
        } else {
            Object.keys(recipeDict).forEach((key: string) => {
                if (window.location.pathname === `/recipes/${encodeURI(recipeDict[key].title)}`) {
                    setRecipe(recipeDict[key]);
                    setRender(true);
                    setIsNotFound(false);
                }
                
                /*
                if (!recipe && Object.keys(recipeDict).length > 0 && Object.keys(recipeDict).indexOf(key) + 1 === Object.keys(recipeDict).length) {
                    setIsNotFound(true);
                    console.log('2');
                }*/
            });
        }
    }, [recipeDict]);

    const RoutedRecipe = (): JSX.Element => {
        if(!recipe) {
            return <Fragment />;
        }

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path={props.match.url} render={() => <RecipeContent {...recipe} />} />
                </Switch>
            </Suspense>
        );
    };
    
    if (isNotFound) {
        return <Redirect to='/404' />;
    }

    if(!render) {
        return <Fragment />;
    }

    return <RoutedRecipe />;
}

const RecipeContent = (props: IRecipePost): JSX.Element => {
    const renderList = (list: Array<any>) => list.map(item => {
        return (
            <li key={item} className="list-group-item">
                {item}
            </li>
        );
    });

    return (
        <article>
            <div className="card mb-4 shadow border-0">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded-start" src={`${process.env.PUBLIC_URL}${props.image}`} alt={props.title} />
                    </div>

                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{props.title}</h2>

                            <div className="card-text" dangerouslySetInnerHTML={{ __html: props.description }} />

                            <p className="card-text mt-5">
                                <small className="text-muted">Last updated: {new Date(props.updatedAt).toISOString().slice(0, 10)}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-3 pb-5">
                <div className="col-12 col-sm-6 col-md">
                    <h3>Ingridients</h3>

                    <ul className="list-group list-group list-group-flush shadow">
                        {renderList(props.ingridients)}
                    </ul>
                </div>

                <div className="col-12 col-sm-6 col-md">
                    <h3>Process</h3>

                    <ol className="list-group list-group-flush list-group-numbered shadow">
                        {renderList(props.process)}
                    </ol>
                </div>
            </div>
        </article>
    );
}