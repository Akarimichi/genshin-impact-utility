import React from 'react';
import { Link } from 'react-router-dom';
import Routes from './routes';
import ImgBackground from '../assets/images/background.png';

const Body = () => {
    return (
        <div style={{ backgroundImage: `url(${ImgBackground})` }} className="body-content">{Routes}</div>
    );
};

export default Body;

