import React, {   useState } from 'react';
import './style.scss'
import spinnerWheel from "../../../../../assets/images/spinner wheel.png"
// import trazary from "../../../../../assets/images/trazary.png"

const spinnerSound = "../../../../../assets/sounds/spinner-sound.wav"


const Index = () => {
    const [spinClass, setSpinClass] = useState("default")

    

    return (

        <div className='spinner-wheel'>
            <div className={`spin-img-wrapper ${spinClass}`}>
                <img src={spinnerWheel} alt='' />
                {
                    new Array(10).fill().map((con, index) => {
                        return <p className="spin-section-item">Lucky?</p>
                    })
                }
            </div>

            <button className='spin-btn' onClick={() => {
                setSpinClass("spin")
                const audioEl = new Audio("/spinner-sound.wav");
                audioEl.play();
                setTimeout(() => {
                    audioEl.pause()
                    setSpinClass("default")
                }, 2000);
            }}>SPIN</button>
            <spin className="indicate-sign" />
        </div>
    );
};

export default Index;