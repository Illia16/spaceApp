import React from 'react';
import "./styles/app.scss";
import Video from "./img/BgVideo2.mp4"

const BgVideo = () => {
    return(
            <video autoPlay loop muted
                style={{
                    position: "fixed",
                    width: "100%",
                    height: "100vh",
                    objectFit: "cover",
                    zIndex: "-10",
                }}
            >
                <source src={Video} type="video/mp4"/>
            </video>
    );
};

export default BgVideo;