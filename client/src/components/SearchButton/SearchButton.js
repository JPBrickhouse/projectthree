import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from "@material-ui/core/Button";

// A component that contains a simple button
// Using the spread operator to expand the props, we get onClick={handleSubmit}
// This function ultimately looks for an onClick event
const SearchButton = (props) => {
    return (
        <div>
            {/* <FormControlLabel
                control={<Button {...props} />}
                label="Search"
            /> */}
            <button {...props}>Search</button>
        </div>
    );
}
export default SearchButton;