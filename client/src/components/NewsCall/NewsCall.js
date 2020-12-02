import React, { useEffect, useState } from "react"

function NewsCall(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        if (props.unitedState !== "") {   
            console.log(props.unitedState)
            fetch("/news/" + props.unitedState)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setData(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }, [props.unitedState])


    // A series of if/else statements to determine whether there is relevant news to display
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (data.response) {
                
        // CONSOLE LOGGING FOR NOW
        console.log(data)

        // Returning the news content
        // Currently only returning the first article as a basic div
        // Future refinements:
        // MAP OVER THE data.response
        // Return a component, where each article is passed as a prop
        return (
            <div>
                <h2> {data.response.docs[0].headline.main} </h2>
                <p> {data.response.docs[0].snippet}</p>
                <p>{data.response.docs[0].web_url}</p>
            </div>
        );
    } else {
        return (<div>
            Nothing to display yet
        </div>)
    }
}

export default NewsCall