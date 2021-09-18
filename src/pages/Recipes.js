import React, { useEffect, useState } from 'react';

export default function Recipes() {
    const [recipeDict, setRecipeDict] = useState();

    useEffect(() => {
        if (!recipeDict) {
            const data = require(`../data/recipes.json`);
            setRecipeDict(data);
        }
    }, [recipeDict]);

    const renderRecipes = () => Object.keys(recipeDict).map((key) => {
        return (
            <article key={key} style={{ maxWidth: '500px', width: '100%' }} className="mx-auto">
                <h2 className="mb-3">{recipeDict[key].name}</h2>
                <div dangerouslySetInnerHTML={{ __html: recipeDict[key].description }} />
            </article>
        );
    });

    return (
        <section>
            {recipeDict && renderRecipes()}
        </section>
    );
}