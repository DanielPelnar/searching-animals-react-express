import { useState, useEffect } from "react";

function App() {
  // custom hook: useAnimalSearch -> 
    // returns an object of two items:
      // an array of animal objects, called: animals
      // and a searching function, called: search
  const { animals, search} = useAnimalSearch();

  return (
    <main>
      <h1>Search animal and get its age...</h1>

      <input 
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {animals.map((animalObj) => {
          return <Animal key={animalObj.item} {...animalObj}/>;
        })}

        {animals.length === 0 && "No animals found."}
      </ul>

    </main>
  );
}

// Components for Animal <li> used in <ul> element in the main:
function Animal({ animalType, age }) {
  return (
    <li>
      <strong>Animal:</strong> {animalType} <strong>age:</strong> {age} years old.
    </li>
   );
}

// Extracting the logic of the App component into a custom hook:
function useAnimalSearch() {
  // Note: function vs custom hook: define custom hook when u want to use other hooks in it, otherwise use just function.
  const [animals, setAnimals] = useState([]);

  useEffect( () => {
    const theLastQuery = localStorage.getItem("lastQuery");
    search(theLastQuery);
  } , []); // on the initial render, execute the callback function -> search for the q that was last seen 

  const search = async (q) => { // needs to be "q"
    const response = await fetch("http://localhost:8080?" + new URLSearchParams({ q })); // needs to be "q" -> e.g "http://localhost:8080?q=dog"
    const data = await response.json();
    setAnimals(data);
    localStorage.setItem("lastQuery", q);
  }
  
  return {animals, search};
}

export default App;
