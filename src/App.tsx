import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header';

const Home = React.lazy(() => import("./pages/Home"));
const Recipes = React.lazy(() => import("./pages/Recipes"));
const Recipe = React.lazy(() => import("./pages/Recipe"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
    return (
        <Router>
            <Header />

            <main className="container py-4">
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/recipes" component={Recipes} />
                        <Route path="/recipes/:recipeName" component={Recipe} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Suspense>
            </main>
        </Router>
    );
}

export default App;