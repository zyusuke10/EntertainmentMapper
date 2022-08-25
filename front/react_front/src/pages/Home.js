import React, { Fragment, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Map from "../components/Map";
import "./Home.css";
import { EventItem } from "../components/EventItem";
import axios from "axios";

const Home = () => {
  
  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:8000/api/spot_search");
    const { name, address, start_date } = data;
    console.log(name);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <header>
        <div className="title">
          <h2>イベントマップ</h2>
          <MenuIcon className="menu-icon" />
        </div>
      </header>

      <div className="map-container">
        <div className="event-search-container">
          <input
            className="event-search"
            type="text"
            name="event"
            placeholder="イベント名検索"
          />
          <ArrowDropDownIcon className="filter-icon" />
        </div>
        <div className="map-box">
          <Map />
        </div>
      </div>

      <div className="eventList-container">
        <div className="event-list-title">
          <h2>イベント一覧</h2>
        </div>
        <EventItem />
      </div>
    </Fragment>
  );
};

export default Home;
