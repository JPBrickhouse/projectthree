import React from 'react';

// A component that contains a simple button
// Using the spread operator to expand the props, we get onClick={handleSubmit}
// This function ultimately looks for an onClick event
const SearchButton = (props) => {
    return (
        <div>
            <button {...props}>Search</button>
        </div>
    );
}
export default SearchButton;