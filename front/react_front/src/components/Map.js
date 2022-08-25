import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import useGeolocation from "../hooks/useGeolocation";
import * as L from "leaflet";

const Map = ({ data }) => {
  const currentLocation = [35.68944, 139.69167]; //現在位置の表示
  const zoom = 10;
  const {
    name,
    address,
    longitude,
    latitude,
    start_date,
    genre,
    picture,
    explanation,
  } = data;
  const position = [35.68944, 139.69167]; //positionを使ってイベントや観光地の場所にピンを置く
  const [isClear, setIsClear] = useState(false);
  const location = useGeolocation();
  const currentPosition = [location.coordinates.lat, location.coordinates.lng];

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const blueIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
    }),
    greenIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
    });

  return (
    <div className="mapContainer">
      <button className="reset-btn" onClick={() => setIsClear(true)}>
        初期化
      </button>
      <MapContainer center={position} zoom={zoom}>
        <ChangeView center={currentPosition} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!isClear &&
          data.map((item, index) => {
            const { name, start_date, explanation, picture } = item;
            return (
              <Marker position={position} key={index} icon={greenIcon}>
                <Popup>
                  {picture}
                  <br></br>
                  {name}
                  <br></br>
                  {start_date}
                  <br></br>
                  {explanation}
                </Popup>
              </Marker>
            );
          })}
        {location.loaded && !location.error && (
          <Marker position={currentPosition}>
            <Popup>現在位置</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
