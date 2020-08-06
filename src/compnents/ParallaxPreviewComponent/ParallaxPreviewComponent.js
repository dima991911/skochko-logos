import React, { useEffect, useRef } from 'react';
import { Parallax } from "react-scroll-parallax";
import "./ParallaxPreviewComponent.css";

export default function ParallaxPreviewComponent({ imgUrl, onClick }) {
    const parallaxEl = useRef(null);

    useEffect(() => {
        const parallaxScroll = () => {
            const { current } = parallaxEl;
            const { y } = current.getBoundingClientRect();
            current.style.opacity =  1 - (y / window.innerHeight);
        };

        window.addEventListener("scroll", parallaxScroll);

        return () => {
            window.removeEventListener("scroll", parallaxScroll);
        }
    }, []);

    return (
        <div
            className="bg-avatar-container"
            onClick={onClick}
        >
            <Parallax
                className="custom-class"
                y={['-200px', '200px']}
                tagOuter="figure"
            >
                <div className="bg-avatar" ref={parallaxEl} style={{ backgroundImage: `url('${imgUrl}')` }} />
            </Parallax>
        </div>
    )
}
