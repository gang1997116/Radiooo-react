import React from 'react';
import RadioImg from '../img/radio.svg';

import Radios from "./radios";
 
const Home = ({match}) => {
    
    return (
    <div>
        <img className="home-img" src={RadioImg} alt=""/>
        <Radios/>  
        {/* {!match.params.id&&<PlayControl id="12222"/>}
       {match.params.id&&<PlayControl id={match.params.id}/>} */}

    </div>  );
}
 

export default Home;