import React, { useEffect, useState } from "react";
import './Delete_slider.css';


const Delete_slider = () => {
    const [slider, setSlider] = useState([]);
    const [message, setMessage] = useState({})

    useEffect(() => {
        fetch('http://localhost:8000/slider_provider')
            .then(res => res.json())
            .then(data => {
                setSlider(data)
            })
    }, []);

    const sliderImgDelet = (e, id) => {
        const cooki = document.cookie.split("=")[1];
        setMessage({})

        if (id) {
            fetch(`http://localhost:8000/slider_img_delete?id=${id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cooki}`
                }

            })
                .then(res => res.json())
                .then(data => {
                    if (data.sucess) {
                        setMessage({})
                        e.target.parentNode.parentNode.style.display = "none"
                    }else{
                        setMessage({failed: data.failed})
                    }
                })
        }
    }


    return (
        <section className=' delet_slider'>
            {
                slider?.length > 0 && slider.map((image, index) => {
                    return <div key={index} >
                        <img
                            className="d-block w-100"
                            src={"http://localhost:8000/" + image.img}
                            alt={"slider" + index}
                        />
                        <div class="btn-group">
                            <button class="btn btn-primary active" aria-current="page" onClick={(e) => sliderImgDelet(e, image._id)}>Delete</button>
                        </div>
                    </div>
                })
            }
            {
                message.failed && <p style={{color: "yellow"}}>{message.failed}</p>
            }
        </section>
    );
};

export default Delete_slider;