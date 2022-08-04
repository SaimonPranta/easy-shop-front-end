import React from 'react';
import TestingConponant from '../../TestingConponant/TestingConponant';
import Header from '../Header/Header';
import TopHeader from '../TopHeader/TopHeader';
import Slider from './Slider/Slider';

const Home = () => {
    return (
        <div>
            <TopHeader/>
            <Header/>
            <Slider/>
            {/* <TestingConponant/> */}
        </div>
    );
};

export default Home;