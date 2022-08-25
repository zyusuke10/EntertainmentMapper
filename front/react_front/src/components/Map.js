import React, { useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  LayerGroup,
  LayersControl,
} from "react-leaflet";
import "./Map.css";
import useGeolocation from "../hooks/useGeolocation";
import * as L from "leaflet";
import Markers from "./Markers";
import { useAppContext } from "../context/appContext";
import { AddMarker } from "./AddMarker";

const Map = ({ data, filteredList }) => {
  const zoom = 8;
  const position = [35.68944, 139.69167]; //positionを使ってイベントや観光地の場所にピンを置く
  const location = useGeolocation();
  const currentPosition = [location.coordinates.lat, location.coordinates.lng];
  const { eventClickName } = useAppContext();

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

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

  const { Overlay } = LayersControl;

  const mapRef = useRef();
  const firstOverlayRef = useRef();
  const secondOverlayRef = useRef();

  return (
    <div className="mapContainer">
      <MapContainer zoom={zoom} ref={mapRef}>
        <ChangeView center={currentPosition} zoom={zoom} />
        <LayersControl position="topright">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            id="tl1"
          />
          <LayersControl.Overlay name="周辺のイベント・観光地">
            <LayerGroup id="lg1" ref={firstOverlayRef}>
              {data.flat().map((item, index) => {
                const {
                  name,
                  start_date,
                  explanation,
                  picture,
                  id,
                  latitude,
                  longitude,
                  genre,
                } = item;

                const positions = [longitude, latitude];

                if (genre === "イベント") {
                  return (
                    <Markers
                      positions={positions}
                      id={id}
                      icon={redIcon}
                      picture={picture}
                      start_date={start_date}
                      explanation={explanation}
                      name={name}
                      key={index}
                    />
                  );
                } else if (genre === "観光地") {
                  return (
                    <Markers
                      positions={positions}
                      id={id}
                      icon={greenIcon}
                      picture={picture}
                      name={name}
                      start_date="指定なし"
                      key={index}
                    />
                  );
                }
              })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        {eventClickName && (
          <AddMarker data={data} filteredList={filteredList} />
        )}
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
