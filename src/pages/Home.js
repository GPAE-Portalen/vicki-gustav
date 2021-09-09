import React, { Fragment, useEffect, useState } from 'react';

export default function Home() {
    const [blogPostDict, setBlogPostDict] = useState();

    useEffect(() => {
        if (!blogPostDict) {
            const data = require(`../data/blog.json`);
            setBlogPostDict(data);
        }
    }, [blogPostDict]);

    const renderBlogPosts = () => Object.keys(blogPostDict).map((key) => {
        return (
            <article key={key} style={{ maxWidth: '500px', width: '100%' }}>
                <h2>{blogPostDict[key].title}</h2>
                <div dangerouslySetInnerHTML={{ __html: blogPostDict[key].body }} />
            </article>
        );
    });

    return (
        <Fragment>
            <h1>Blog</h1>

            <section>
                {blogPostDict && renderBlogPosts()}
            </section>
        </Fragment>
    );
}