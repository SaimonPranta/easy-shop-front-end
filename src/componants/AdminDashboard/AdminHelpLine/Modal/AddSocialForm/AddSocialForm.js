import React, { useState } from 'react';
import "./style.scss"

const AddSocialForm = ({ showModal, setShowModal, onSubmit }) => {
    const [input, setInput] = useState({})

    const handleChange = (e) => {
        const name = e.target.name;

        if (name === "img") {
            setInput((state) => {
                return {
                    ...state,
                    [name]: e.target.files[0]
                }
            })
        } else {
            const value = e.target.value
            setInput((state) => {
                return {
                    ...state,
                    [name]: value
                }
            })
        }

    }

    console.log("input", input)

    if (!showModal) {
        return <></>
    }
    return (
        <div className='add-social-form' >
            <form  >
                <div>
                    <label> Image *</label>
                    <input type='file' name='img' onChange={handleChange} />
                </div>
                <div>
                    <label> Label *</label>
                    <input type='text' name='label' value={input.label} onChange={handleChange} />
                </div>
                <div>
                    <label>Button Name </label>
                    <input type='text' name='buttonName' value={input.buttonName} onChange={handleChange} />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type='text' name='phoneNumber' value={input.phoneNumber} onChange={handleChange} />
                </div>
                <div>
                    <label> Link *</label>
                    <input type='link' value={input.link} name='link' onChange={handleChange} />
                </div>

                <div className='action-btn-container'>
                    <button onClick={() => setShowModal(false)} >Cancel</button>
                    <button type='button' onClick={(e) => onSubmit(e, input)}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddSocialForm;