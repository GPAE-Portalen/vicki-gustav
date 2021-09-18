import React, { useEffect, useState, Fragment } from 'react';

export default function Recipes() {
    const [recipeDict, setRecipeDict] = useState();

    useEffect(() => {
        if (!recipeDict) {
            const data = require(`../data/recipes.json`);
            setRecipeDict(data);
        }
    }, [recipeDict]);

    const renderList = (list) => list.map(item => {
        return (
            <li key={item} className="list-group-item">
                {item}
            </li>
        );
    });

    const renderRecipes = () => Object.keys(recipeDict).map((key) => {
        return (
            <Fragment key={key}>
                <article className="mb-5">
                    <div className="card mb-4 shadow border-0">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img className="img-fluid rounded-start" src={`${process.env.PUBLIC_URL}${recipeDict[key].image}`} alt={recipeDict[key].title} />
                            </div>

                            <div className="col-md-8">
                                <div className="card-body">
                                    <h2 className="card-title">{recipeDict[key].title}</h2>

                                    <div className="card-text" dangerouslySetInnerHTML={{ __html: recipeDict[key].description }} />

                                    <p className="card-text mt-5">
                                        <small className="text-muted">Last updated: {new Date(recipeDict[key].date).toISOString().slice(0, 10)}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3 pb-5">
                        <div className="col-12 col-sm-6 col-md">
                            <h3>Ingridients</h3>

                            <ul className="list-group list-group list-group-flush shadow">
                                {renderList(recipeDict[key].ingridients)}
                            </ul>
                        </div>

                        <div className="col-12 col-sm-6 col-md">
                            <h3>Process</h3>

                            <ol className="list-group list-group-flush list-group-numbered shadow">
                                {renderList(recipeDict[key].process)}
                            </ol>
                        </div>
                    </div>
                </article>
            </Fragment>
        );
    });

    return (
        <section>
            <h1 className="mb-3">Recipes</h1>

            {recipeDict && renderRecipes()}
        </section>
    );
}