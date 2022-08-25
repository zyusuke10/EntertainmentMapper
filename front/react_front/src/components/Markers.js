import React from "react";
import { Marker, Popup } from "react-leaflet";
function Markers({
  positions,
  id,
  icon,
  picture,
  start_date,
  name,
}) {
  return (
    <Marker position={positions} key={id} icon={icon}>
      <Popup maxWidth="100" maxHeight="150">
        <img src={picture} alt="event picture" className="picture" />
        <br></br>
        {`${name}`}
        <br></br>
        {`日程:${start_date}`}
      </Popup>
    </Marker>
  );
}

export default Markers;
