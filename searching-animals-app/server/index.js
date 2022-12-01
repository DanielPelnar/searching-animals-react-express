import Express from "express";
import Cors from "cors";

// Initialise the Express app:
const app = Express();
app.use(Cors()); // Cross-Origin resource sharing; needed so frontend can query the data
app.use(Express.json());

// Generate random data of Animals; each animal has animalType, age
import Chance from "chance";
const chance = Chance();

const animals = [...Array(200).keys()].map((item) => { // [...Array(200).keys()] is like range in Python; regerates an array [0, 1, ..., 200] by the index
    return { // each item becomes an object
        item, // index used so React can do optimisations
        animalType: chance.animal(),
        age: chance.age(),
    }
}); // animals is an array of objects

// console.log(animals);

// Create API; HTTP Endpoint to search for animals, e.g. http://localhost:8080/?q=dog
app.get("", (req, res) => { // "" means that http://localhost:8080 and if "/animal", then http://localhost:8080/animal
    // This function is run on each request (run every time the url is visited).
    // Get what is typed after ?q=
    const q = req.query.q?.toLowerCase() || ""; // if nothing typed, then q = ""

    const results = animals.filter((animalObj) => {
        return animalObj.animalType.toLowerCase().includes(q);
    });

    res.send(results);
}); // e.g http://localhost:8080/?q=dog

// Starting it up on port: 8080
app.listen(8080, () => console.log("Listening on port http://localhost:8080"));

/* This script needs to run all the time, for the API to work */