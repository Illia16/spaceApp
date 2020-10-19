import React, { useRef, useState } from 'react';
import "./styles/app.scss";
import Video from "./img/BgVideo2.mp4";
import Switch from "react-switch";

const BgVideo = () => {
    const spaceVideoRef = useRef();
    const updateSpeed = () => { spaceVideoRef.current.playbackRate = .8; };

    // hook to toogle between background VIDEO and PICTURE (so that the user can read without distraction)
    const [bgVideo, toggleBg] = useState(true);

    return(
        <div>
            {
            bgVideo ?
                <video
                    autoPlay
                    loop
                    muted
                    ref={ spaceVideoRef }
                    onCanPlay={ () => updateSpeed() }
                    className="bg bgVideo"
                >
                <source src={Video} type="video/mp4"/>
                </video>
                : 
                <div className="bg bgPicture"></div>
            }
            <label htmlFor="toggleBg" className="srOnly">toggle background from video to picture</label>
            <Switch onChange={e => toggleBg(!bgVideo)} checked={bgVideo} id="toggleBg" />
            {/* <button onClick={e => toggleBg(!bgVideo)}>Toggle Bg</button> */}
        </div>
    );
};

export default BgVideo;