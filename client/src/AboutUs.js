import React from 'react';

import AboutUsIndividualCard from "./components/AboutUsIndividualCard/AboutUsIndividualCard"

import CreatorData from "./data/about-data.json"

const AboutUs = () => {
    return (
        <div>
            {CreatorData.map(eachPerson =>
                <AboutUsIndividualCard
                    key={eachPerson.firstName}
                    firstName={eachPerson.firstName}
                    lastName={eachPerson.lastName}
                    githubPicURL={eachPerson.githubPicURL}
                    linkedIn={eachPerson.linkedIn}
                    github={eachPerson.github}
                    portfolio={eachPerson.portfolio}
                />
            )}
        </div>
    );
}

export default AboutUs;