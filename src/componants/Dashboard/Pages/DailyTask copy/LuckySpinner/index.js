import React, { useState } from 'react';
import './style.scss'
import spinnerWheel from "../../../../../assets/images/spinner wheel.png"
// import trazary from "../../../../../assets/images/trazary.png"


const Index = ({ handleSpinClick, disableSpin }) => {
    const [currentSpinNumber, setCurrentSpinNumber] = useState(null)
    const [spinStyes, setSpinStyles] = useState({})



    return (

        <div className='spinner-wheel'>
            <div className={`spin-img-wrapper `} style={{
                ...spinStyes,
                // transform: `rotate(146deg)`
            }}>
                <img src={spinnerWheel} alt='' />
                {/* {
                    new Array(10).fill().map((con, index) => {
                        return <p className="spin-section-item">Lucky?</p>
                    })
                } */}
            </div>

            <button className='spin-btn' onClick={() => {
                if (disableSpin) {
                    return 
                }
                handleSpinClick()
                let spinSectionNumber = Math.floor(Math.random() * 10) + 1;
                let spinNumber = 4;
                spinNumber = spinNumber - spinSectionNumber
                if (spinNumber < 0) {
                    spinNumber = 10 + spinNumber
                }
                const newSpinAmount = spinSectionNumber * 36
                setSpinStyles({
                    transform: `rotate(${7200 + newSpinAmount}deg)`,
                })
                const audioEl = new Audio("/spinner-sound.wav");
                audioEl.play();
                setTimeout(() => {
                    audioEl.pause()
                    setCurrentSpinNumber(spinNumber)
                }, 2000);
            }}>SPIN</button>
            <spin className="indicate-sign" />
        </div>
    );
};

export default Index;