import React, { useState } from 'react';
import Delete_slider from './Delete_slider';

const Index = () => {
    const [image, setImage] = useState(null)
    const [message, setMessage] = useState({})


    const handleInput = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const cooki = document.cookie.split("=")[1];
        if (image && cooki) {
            setMessage({})
            const formData = new FormData()
            formData.append('image', image)

            fetch("http://localhost:8000/addSlider", {
                method: 'POST',
                body: formData,
                headers: {
                    authorization: `Bearer ${cooki}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.sucess) {
                        setMessage({ sucess: data.sucess })
                    } else {
                        setMessage({ failed: data.failed })
                    }
                })
        } else {
            setMessage({ failed: "Please Select an image and try again." })
        }
    }



    return (
        <div >
            <div >
                <Delete_slider controler={message} /> 
            </div>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Slider Image</label>
                    <input type="file" class="form-control" name='image' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleInput} />
                </div>
                <button type="submit" class="btn btn-primary mx-3" onClick={handleSubmit}>Upload</button>
                <div>
                    {
                        message.sucess && !message.failed ? <p style={{ color: "green" }}>{message.sucess}</p> : <p style={{ color: "yellow" }}>{message.failed}</p>
                    }
                </div>
            </form>
        </div>
    );
};

export default Index;