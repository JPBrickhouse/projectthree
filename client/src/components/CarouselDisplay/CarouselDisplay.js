// Importing React and useState Hooks from react
import React, { useState, useEffect } from "react";

import "./CarouselDisplay.css";

import Slide from "@material-ui/core/Slide";

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import CarouselSlide from "../CarouselSlide/CarouselSlide";

// import { SLIDE_INFO } from "../CarouselSlide/constant";

// ---------------------------------------------------------
// A function that controls the behavior of the arrow clicks
function Arrow(props) {
    const { direction, clickFunction } = props;
    const icon = direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />;

    return <div onClick={clickFunction}>{icon}</div>;
};

// ---------------------------------------------------------
function CarouselDisplay(props) {

    const newsArrayToDisplay = props.newsArray;

    // News content and its initial states
    const [index, setIndex] = useState(0); // Start the index at 0
    const content = newsArrayToDisplay[index];
    const numSlides = newsArrayToDisplay.length;
    
    // Arrow functions for carousel
    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('left');

    const onArrowClick = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;
        setIndex(newIndex);

        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 39) {
                onArrowClick('right');
            }
            if (e.keyCode === 37) {
                onArrowClick('left');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    return (
        <div>

            {/* Arrows */}
            <Arrow
                style={{ display: 'flex', height: '10px', cursor: 'pointer' }}
                direction='left'
                clickFunction={() => onArrowClick('right')}
            />
            <Arrow
                style={{ display: 'flex', height: '10px', cursor: 'pointer' }}
                direction='right'
                clickFunction={() => onArrowClick('left')}
            />
            
            {/* Slides generated here */}
            <Slide in={slideIn} direction={slideDirection}>
                <div>
                    <CarouselSlide content={content} />
                </div>
            </Slide>

        </div>
    )
}

export default CarouselDisplay;