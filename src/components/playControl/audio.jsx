import React from "react";


const Audio = React.forwardRef((props,ref) => (
  
 <audio
      
  id={"audioplayer"}
  src={props.src}
  type="audio/mpeg"
  ref={(ref)}
  style={{ visibility: "hidden" }}

></audio>
  
));

export default Audio;

