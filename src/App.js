import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./recipe";

const App = () => {
    const APP_ID = "6f20881e";
    const APP_KEY = "e8f03f96cc8aa42b152de501421e3267";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("chicken");

    useEffect(() => {

        const getRecipes = async () => {
            const responce = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
            const data = await responce.json();
            setRecipes(data.hits);
            console.log(data.hits);
        };
        getRecipes();
    }, [query]);

    const updateSearch = e => {
        setSearch(e.target.value);
    };
    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
    };
    return (
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={updateSearch} />
                <button className="search-button" type="submit">search</button>
            </form>
            <div className="recipes">
                {recipes.map(recipe => (<Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />))}
            </div>
        </div>
    );
};
export default App;
