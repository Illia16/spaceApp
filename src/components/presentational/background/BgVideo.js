import React, { useRef, useState } from 'react';
import "../../../styles/app.scss";
import Video from "./BgVideo2.mp4";
import Switch from "react-switch";

const BgVideo = () => {
    const spaceVideoRef = useRef();
    const updateSpeed = () => { spaceVideoRef.current.playbackRate = 0.8; };

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
            
            <div className="bgOnOff">
                <label htmlFor="toggleBg" className="srOnly">toggle background from video to picture</label>
                <Switch
                    onChange={e => toggleBg(!bgVideo)} 
                    checked={bgVideo} 
                    id="toggleBg"
                    onHandleColor = '#000000'
                    offHandleColor = '#000000'
                    onColor = '#ffffff'
                    offColor = '#ffffff'
                    checkedIcon = {
                        <svg viewBox="-10 -7 40 40" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
                    }
                    uncheckedIcon = {
                        <svg viewBox="-6 -6 40 40" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M24 23h-24v-21h24v21zm-20-1v-4h-3v4h3zm15 0v-19h-14v19h14zm4 0v-4h-3v4h3zm-6-9.5l-9 5v-10l9 5zm3 .5v4h3v-4h-3zm-16 4v-4h-3v4h3zm5-1.2l5.941-3.3-5.941-3.3v6.6zm11-7.8v4h3v-4h-3zm-16 4v-4h-3v4h3zm16-9v4h3v-4h-3zm-16 4v-4h-3v4h3z"/></svg>
                    }
                />
            </div>
        </div>
    );
};

export default BgVideo;