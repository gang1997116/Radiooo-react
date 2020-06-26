import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { paginate } from './utils/paginate';
import Pagination from "./components/pagination";
import ReactAudioPlayer from 'react-audio-player';

function Shop() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);
  const [pageSize]=useState(10);
  const [currentPage,setCurrentPage]=useState(1);

  function handlePagechange(page) { 
    setCurrentPage(page);
  };

  const fetchItems = async () => {
    const data = await fetch(
      "https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi?country=ALL&keyword=love&genre=ALL",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "30-000-radio-stations-and-music-charts.p.rapidapi.com",
          "x-rapidapi-key":
            "4c4c703187msh7ceb377e6edd80fp1e8baajsn13dbcb0375ac",
        },
      }
    );
    const items = await data.json();
    //console.log(items.results);
    setItems(items.results);
    
  };
  const { length: count } = items;
  const radios =paginate(items,currentPage,pageSize);

  
  return (
    <div>
      <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Play</th>
            </tr>
          </thead>
          <tbody>
      {radios.map((item) => (
        <tr key={item.i}>
          <td><Link to={`shop/${item.i}`}>{item.n}</Link></td>
          <td><ReactAudioPlayer src={item.u} controls type="audio/mpeg" /></td>
        </tr>
        
      ))}
        </tbody>
        </table>
      <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePagechange}
        />
    </div>
  );
}

export default Shop;
