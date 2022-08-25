import React from "react";
import { Marker, Popup } from "react-leaflet";
function Markers({
  positions,
  id,
  greenIcon,
  picture,
  start_date,
  explanation,
  name,
}) {
  return (
    <Marker position={positions} key={id} icon={greenIcon}>
      <Popup>
        <img src={picture} alt="event picture" className="picture" />
        <br></br>
        {name}
        <br></br>
        {start_date}
        <br></br>
        {explanation}
      </Popup>
    </Marker>
  );
}

export default Markers;
