import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import("./pages/Home"));
const Recipes = React.lazy(() => import("./pages/Recipes"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
    return (
        <Router>
            <main className="container p-4">
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/recipes" component={Recipes} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </React.Suspense>
            </main>
        </Router>
    );
}

export default App;