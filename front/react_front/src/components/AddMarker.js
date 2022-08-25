import React, { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useAppContext } from "../context/appContext";
import * as L from "leaflet";

export const AddMarker = ({ data, filteredList }) => {
  const { eventClickName } = useAppContext();
  const specificData = filteredList
    .flat()
    .filter((item) => item.name === eventClickName);
  const { latitude, longitude, id, picture, start_date } = specificData[0];
  const positions = [longitude, latitude];
  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
  });

  const redIcon = new LeafIcon({
    iconUrl:
      "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
    iconSize: [20, 36],
  });

  return (
    <Marker
      position={positions}
      id={id}
      icon={specificData.genre === "イベント" ? redIcon : greenIcon}
    >
      <Popup maxWidth="100" maxHeight="150">
        <img src={picture} alt="img" className="picture" />
        <br></br>
        {`${eventClickName}`}
        <br></br>
        {`日程:${start_date}`}
      </Popup>
    </Marker>
  );
};
