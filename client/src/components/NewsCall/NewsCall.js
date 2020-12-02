
import React, { useEffect, useState } from "react"

require('dotenv').config();
const NYTIMES_KEY = process.env.REACT_APP_NYTIMES_KEY;


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


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (data.response) {
        console.log(data)
        // if (data.response.docs[0] !== []) {


        return (
            <div>
                <h2> {data.response.docs[0].headline.main} </h2>
                <p> {data.response.docs[0].snippet}</p>
                <p>{data.response.docs[0].web_url}</p>
            </div>

            // <div>



            // </div>


        );
        // }
    } else {
        return (<div>
            Nothing to display yet
        </div>)
    }
}

export default NewsCall