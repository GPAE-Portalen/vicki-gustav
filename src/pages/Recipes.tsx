import React, { useEffect, useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { IDictionary, IRecipePost } from '../interfaces';

export default function Recipes() {
    const [recipeDict, setRecipeDict] = useState<IDictionary<IRecipePost>>();

    useEffect(() => {
        if (!recipeDict) {
            const data = window.repository.getRecipePosts();
            setRecipeDict(data);
        }
    }, [recipeDict]);


    const renderRecipeCards = (): JSX.Element | JSX.Element[] => {
        if(!recipeDict) {
            return <Fragment />;
        }
        
        return Object.keys(recipeDict).map((key) => {
            return (
                <article key={key} className="col-12 col-xl-6">
                    <div className="card mb-4 shadow border-0">
                        <div className="row g-0">
                            <div className="col-md-4" style={{ maxHeight: '250px', overflow: 'hidden' }}>
                                <img className="img-fluid rounded-start" src={`${process.env.PUBLIC_URL}${recipeDict[key].image}`} alt={recipeDict[key].title} style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%', position: 'relative' }} />
                            </div>

                            <div className="col-md-8">
                                <div className="card-body">
                                    <h2 className="card-title">{recipeDict[key].title}</h2>
                                    
                                    <NavLink to={`/recipes/${encodeURI(recipeDict[key].title)}/`} className="stretched-link">
                                        Read the recipe
                                    </NavLink>

                                    <p className="card-text mt-5">
                                        <small className="text-muted">Last updated: {new Date(recipeDict[key].date).toISOString().slice(0, 10)}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            );
        });     
    };

    return (
        <section>
            <h1 className="mb-3">Recipes</h1>

            <div className="row g-3">
                {renderRecipeCards()}
            </div>
        </section>
    );
}