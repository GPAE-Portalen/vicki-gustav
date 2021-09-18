import React, { Fragment, useEffect, useState } from 'react';

import { IDictionary } from '../interfaces';

interface IBlogPost {
    title: string;
    body: string;
    date: Date;
    updatedAt: Date;
}

export default function Home(): JSX.Element {
    const [blogPostDict, setBlogPostDict] = useState<IDictionary<IBlogPost>>();

    useEffect(() => {
        if (!blogPostDict) {
            const data = require(`../data/blog.json`);
            setBlogPostDict(data);
        }
    }, [blogPostDict]);

    const renderBlogPosts = () => {
        if(!blogPostDict) {
            return <Fragment />;
        }

        return Object.keys(blogPostDict).map((key) => {
            return (
                <article key={key} style={{ maxWidth: '500px', width: '100%' }} className="mx-auto">
                    <h2 className="mb-3">{blogPostDict[key].title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: blogPostDict[key].body }} />
                </article>
            );
        });
    };

    return (
        <section className="text-center">
            {renderBlogPosts()}
        </section>
    );
}