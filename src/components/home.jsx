import React from 'react';
import RadioImg from '../img/radio.svg'
import PlayControl from './playControl/playControl';

 
const Home = ({match}) => {
    return (<div>
        <img className="home-img" src={RadioImg} alt=""/>
        {!match.params.id&&<PlayControl id="12222"/>}
       {match.params.id&&<PlayControl id={match.params.id}/>}
    </div>  );
}
 

export default Home;