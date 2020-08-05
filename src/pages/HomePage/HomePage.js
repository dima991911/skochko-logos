import React, { useEffect, useState } from "react";
import "./HomePage.css";

import HeaderComponent from "../../compnents/HeaderComponent/HeaderComponent";
import { ProjectItemComponent } from "../../compnents/ProjectItemComponent/ProjectItemComponent";
import { works } from "../../images/works";

const topSectionTitles = [
    'Welcome to my',
    'Portfolio',
];

function HomePage({ history }) {
    const [canAnimateTitle, setAnimateTitle] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnimateTitle(true);
        }, 1500);
    }, []);

    return (
        <div className="page">
            <div className="top-section-wrapper">
                <HeaderComponent />
                <section className="top-section">
                    {canAnimateTitle && (
                        <h1>
                            {topSectionTitles.map((title, index) => (
                                <span className="top-section-span-animate-wrapper" key={index}>
                                    <span className="top-section-span" style={{ animationDuration: `${(index * 0.3) + 0.6}s` }}>{title}</span>
                                </span>
                            ))}
                        </h1>
                    )}
                </section>
            </div>

            <div className="works">
                {works.map((column, index) => (
                    <div className="columns" key={index}>
                        {column.map((work, i) => (
                            <ProjectItemComponent
                                work={work}
                                history={history}
                                id={`${index}${i}`}
                                key={i}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
