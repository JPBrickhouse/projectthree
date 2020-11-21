// Importing the data from the us-states.json file
import usstates from "../data/us-states.json"

// Creating a class (aka, template for creating objects)
class LoadUSstates{

    // Adding a load method to that class
    // The argument it takes is a setState function
    // The setState function takes in the usstates.feautres
    // (aka, the geometric data from each of the states)
    load = (setState) => {
        setState(usstates.features)
    }
}

// Exporting the class
export default LoadUSstates;