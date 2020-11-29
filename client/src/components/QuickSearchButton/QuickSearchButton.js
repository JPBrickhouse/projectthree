import React from 'react';

// A component that contains a quick search button
// Takes in a a search query in props and displays it on the button
// If the button is hit, the newSearchEntry is populated with the value assigned to the button
const QuickSearchButton = (props) => {
    return (
        <div>
            <button {...props}>{props.value}</button>
        </div>
    );
}
export default QuickSearchButton;