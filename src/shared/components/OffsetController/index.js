import React from 'react';
import './style.css';

const Index = ({ offset, setOffset }) => {
    return (
        <div className='pagination-control-container'>
            <div><p onClick={() => {
                setOffset((count) => {
                    if (count > 1) {
                        return count - 1
                    }
                    return count
                })
            }}>Previous</p>
                <p>{offset}</p>
                <p onClick={() => setOffset((count) => {
                    return count + 1

                })}>Next</p> </div>
        </div>
    );
};

export default Index;