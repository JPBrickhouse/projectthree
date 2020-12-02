import React, { useEffect, useState } from "react";

// A component that contains a quick search button
// Takes in a a search query in props and displays it on the button
// If the button is hit, the newSearchEntry is populated with the value assigned to the button
const QuickSearchButton = (props) => {

    const [textDisplay, setTextDisplay] = useState("")

    // useEffect that conditionally runs when props.value changes
    useEffect(() => {
        // Switch case that determines what is getting displayed via the textDisplay
        switch (props.value) {
            case "covid":
                setTextDisplay("Covid Statistics")
                break;
            case "senator":
                setTextDisplay("Contact your Senators")
                break;
            case "general":
                setTextDisplay("General State Facts")
                break;
            default:
                setTextDisplay("Button")
        }
    },[props.value])

    // The return of the function, which is the button div
    return (
        <div>
            <button {...props}>{textDisplay}</button>
        </div>
    );
}
export default QuickSearchButton;