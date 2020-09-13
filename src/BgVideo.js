import React, {useRef} from 'react';
import "./styles/app.scss";
import Video from "./img/BgVideo2.mp4";

const BgVideo = () => {
    const spaceVideoRef= useRef();
    const updateSpeed = () => { spaceVideoRef.current.playbackRate = .8; };

    return(
            <video
                autoPlay
                loop
                muted
                ref={ spaceVideoRef }
                onCanPlay={ () => updateSpeed() }

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