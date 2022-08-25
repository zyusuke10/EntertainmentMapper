import React, { Fragment, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Map from "../components/Map";
import "./Home.css";
import { EventItem } from "../components/EventItem";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]); //APIを叩いて取得したデータを格納する
  const clickHandler = (e) => {
    console.log(e);
  };
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/spot_search/"
      );
      setData([data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <header>
        <div className="title">
          <h2>娯楽マップ</h2>
          <MenuIcon className="menu-icon" />
        </div>
      </header>

      <div className="map-container">
        <div className="event-search-container">
          <input
            className="event-search"
            type="text"
            name="event"
            placeholder="イベント名・観光地　検索"
          />
          <ArrowDropDownIcon className="filter-icon" />
        </div>
        <div className="map-box">
          <Map data={data} />
        </div>
      </div>

      <div className="color-container">
        <div className="green">イベント・観光地</div>
        <div className="blue">現在地</div>
      </div>

      <div className="eventList-container">
        <div className="event-list-title">
          <h2>娯楽一覧</h2>
        </div>
        {data.map((item, index) => {
          const { name, address, start_date } = item;
          return (
            <EventItem
              name={name}
              address={address}
              date={start_date}
              key={index}
              onClick={clickHandler}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default Home;
