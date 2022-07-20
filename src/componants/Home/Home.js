import React from 'react';
import Header from '../Header/Header';
import TopHeader from '../TopHeader/TopHeader';
import Slider from './Slider/Slider';

const Home = () => {
    return (
        <div>
            <TopHeader/>
            <Header/>
            <Slider/>
        </div>
    );
};

export default Home;