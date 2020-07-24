import React from "react";
import { Link } from "react-router-dom";
import { Tween } from "react-gsap";

const GenreLabel = ({ genre }) => {
  return (
    <div className="genre-group">
      <Tween
        from={{
          y: 6,
          opacity: 0,
        }}
        duration={0.13}
        stagger={0.07}
      >
        {genre.map((genre) => (
          <div style={{ display: "inline-block" }} key={genre.id}>
            <Link to={`/shop/genre/${genre.id}`} className="genre-label">
              <span>{genre.name}</span>
            </Link>
          </div>
        ))}
      </Tween>
      
    </div>
  );
};

export default GenreLabel;
