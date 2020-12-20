import React from 'react';

const AboutUsIndividualCard = (props) => {
    return (
        <div>
            <o>{props.firstName}</o>
            <p>{props.lastName}</p>
            <img src={props.githubPicURL}/>
            <a href={props.linkedIn}>LinkedIn</a>
            <a href={props.github}>GitHub</a>
            <a href={props.portfolio}>Portfolio</a>
        </div>
    );
}

export default AboutUsIndividualCard;