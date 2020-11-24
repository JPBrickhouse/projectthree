import React, { Component } from "react"

// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// URL: "https://api.covidtracking.com/v1/states/" + state + "/current.json"
class ApiCall extends Component {
    constructor() {
        super()
        this.state = {
            covidData: {}
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        fetch("https://api.covidtracking.com/v1/states/" + "il" + "/current.json")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    covidData: data,
                })
                // console.log(data)
            })
    }

    render() {
        const positiveCases = "Positive cases: "  + this.state.covidData.positive;
        const hospitalized = "Currently hospitalized: " + this.state.covidData.hospitalizedCurrently;
        const deaths = "Number of deaths: " + this.state.covidData.death;
        
        return (
            <div>
                <p>{positiveCases}</p>
                <p>{hospitalized}</p>
                <p>{deaths}</p>
            </div>
        )
    }
}

export default ApiCall