import React from 'react';

// A component that contains a simple input form
// Using the spread operator to expand the props, we get onChange={handleInputChange}
// This function ultimately looks for an onChange event based on the content in the input
const SearchBar = (props) => {
    return (
        <div>
            <form>
                <input {...props} type="text" id="searchEntry" placeholder="Search for something!"></input>
            </form>
        </div>
    );
}
export default SearchBar;