// Importing React and Hooks
import React, { useEffect, useState } from "react"

// This is the SenatorApiCall function and we are passing it props
function SenatorApiCall(props) {
    const [stateAndSenatorData, setStateAndSenatorData] = useState({
        firstSenator: {},
        secondSenator: {}
    })
    
    // useEffect that conditionally runs when props.usstateAbbrev changes
    useEffect(() => {
        // Also adding a conditional if statement to confirm that props.usstateAbbrev isn't blank/empty
        // That way there aren't any unexplained results and/or errors when the API call is made
        if (isStateAbbreviationNotEmpty(props)) {
            // Making the api call to fetch the senator data
            fetch("/senators/" + props.usstateAbbrev)
                .then(response => response.json())
                .then(data => {
                    setStateAndSenatorData({
                        firstSenator: data.results[0],
                        secondSenator: data.results[1]
                    });
                })
        }
    }, [props.usstateAbbrev])

    // display senator name + party in parentheses. Also add links to the senators' twitter accounts
    if (isStateAbbreviationNotEmpty(props)) {
        return (
            <div>
                <p>
                    <a href={"https://www.twitter.com/" + stateAndSenatorData.firstSenator.twitter_id} target="_blank"> {stateAndSenatorData.firstSenator.name} ({stateAndSenatorData.firstSenator.party})</a>
                </p>
                <p>
                    <a href={"https://www.twitter.com/" + stateAndSenatorData.secondSenator.twitter_id} target="_blank"> {stateAndSenatorData.secondSenator.name} ({stateAndSenatorData.secondSenator.party})</a>
                </p>
            </div>
        )
    } else {
        return null;
    }
}

function isStateAbbreviationNotEmpty(props) {
    return props.usstateAbbrev !== "";
}

export default SenatorApiCall
