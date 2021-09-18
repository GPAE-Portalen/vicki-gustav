import React, { useEffect, useState } from 'react';

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
            <article key={key} style={{ maxWidth: '500px', width: '100%' }} className="mx-auto">
                <h2 className="mb-3">{blogPostDict[key].title}</h2>
                <div dangerouslySetInnerHTML={{ __html: blogPostDict[key].body }} />
            </article>
        );
    });

    return (
        <section className="text-center">
            {blogPostDict && renderBlogPosts()}
        </section>
    );
}