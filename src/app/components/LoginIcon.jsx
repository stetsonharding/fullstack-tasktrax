import React from 'react';

export const LoginIcon = () => {

    const gradientTextStyle = {
        background: 'linear-gradient(45deg, #29bed4, #6a11cb)',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        
      };
    return (
        <div className="d-flex justify-content-center flex-column align-items-center ">
            <i><h1 className="gradientTextStyle" style={gradientTextStyle} >Task Trax</h1></i>
            <span className="f-md"><i>Transform Chaos into Clarity.</i></span>
        </div>
    );
};
