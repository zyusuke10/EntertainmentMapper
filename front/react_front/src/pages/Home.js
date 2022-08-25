import React, { Fragment, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Map from "../components/Map";
import Menu from "../components/Menu";
import "./Home.css";
import { EventItem } from "../components/EventItem";
import axios from "axios";
import { Dialog, DialogContent, MenuItem, Select } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  MapContainer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  TileLayer,
} from "react-leaflet";
import * as L from "leaflet";
// import { useAppContext } from "../context/appContext";

const Home = () => {
  const [data, setData] = useState([]); //APIを叩いて取得したデータを格納する
  const [searchInput, setSearchInput] = useState("");
  const [showDialogue, setShowDialogue] = useState(false);
  const [prefecture, setPrefecture] = useState("");
  const [genre, setGenre] = useState("");
  const [date, setDate] = useState("");
  const [filteredList, setFilteredList] = useState([]);


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

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/spot_search/"
      );
      setData([data]);
      setFilteredList([data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const inputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (searchInput.trim() !== "") {
      const searchFilteredData = filteredList
        .flat()
        .filter((item) => item.name.includes(searchInput));
      setData(searchFilteredData);
      setSearchInput("");
      // setIsClear(false);
    } else {
      return;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!date || !genre || !prefecture) {
      return;
    } else {
      const deeplyFilteredData = filteredList.flat().filter((item) => {
        return (
          (item.genre === genre &&
            item.start_date.substring(5, 7).includes(date.charAt(0))) ||
          item.address.includes(prefecture)
        );
      });
      setData(deeplyFilteredData);
      setGenre("");
      setPrefecture("");
      setDate("");
      setShowDialogue(false);
    }
  };

  

  return (
    <Fragment>
      <header>
        <div className="title">
          <h2>娯楽マップ</h2>
          <Menu />
        </div>
      </header>

      <div className="map-container">
        <div className="event-search-container">
          <input
            className="event-search"
            type="text"
            name="event"
            placeholder="イベント名・観光地　検索"
            onChange={inputHandler}
          />
          <button
            type="submit"
            className="btn-search"
            onClick={searchSubmitHandler}
          >
            検索
          </button>
          <ArrowDropDownIcon
            className="filter-icon"
            onClick={() => setShowDialogue(!showDialogue)}
          />
        </div>
        <div className="map-box">
          <Map data={data} filteredList={filteredList}/>
        </div>
      </div>

      <div className="color-container">
        <div className="green">観光地</div>
        <div className="red">イベント</div>
        <div className="blue">現在地</div>
      </div>

      <div className="eventList-container">
        <div className="event-list-title">
          <h2>娯楽一覧</h2>
        </div>
        {data.flat().map((item) => {
          const { name, address, start_date, id } = item;
          return (
            <EventItem
              name={name}
              address={address}
              date={start_date}
              key={id}
              spotId={id}
              data={data}
            />
          );
        })}
      </div>

      <Dialog
        open={showDialogue}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            boxShadow: "none",
            textAlign: "center",
            width: "auto",
          },
        }}
      >
        <DialogContent>
          <form onSubmit={submitHandler}>
            <div className="filter-container">
              <div className="date-box">日程(月)</div>
              <Select
                onChange={(e) => setDate(e.target.value)}
                className="selector"
              >
                <MenuItem value="1月">1月</MenuItem>
                <MenuItem value="2月">2月</MenuItem>
                <MenuItem value="3月">3月</MenuItem>
                <MenuItem value="4月">4月</MenuItem>
                <MenuItem value="5月">5月</MenuItem>
                <MenuItem value="6月">6月</MenuItem>
                <MenuItem value="7月">7月</MenuItem>
                <MenuItem value="8月">8月</MenuItem>
                <MenuItem value="9月">9月</MenuItem>
                <MenuItem value="10月">10月</MenuItem>
                <MenuItem value="11月">11月</MenuItem>
                <MenuItem value="12月">12月</MenuItem>
              </Select>
              <ClearIcon
                className="clearIcon"
                onClick={() => setShowDialogue(false)}
              />
            </div>

            <div className="filter-container">
              <div className="date-box">ジャンル</div>
              <Select
                onChange={(e) => setGenre(e.target.value)}
                className="selector"
              >
                <MenuItem value="イベント">イベント</MenuItem>
                <MenuItem value="観光地">観光地</MenuItem>
              </Select>
            </div>

            <div className="filter-container">
              <div className="date-box">場所</div>
              <Select
                onChange={(e) => setPrefecture(e.target.value)}
                className="selector"
              >
                <MenuItem value="北海道">北海道</MenuItem>
                <MenuItem value="青森県">青森県</MenuItem>
                <MenuItem value="秋田県">秋田県</MenuItem>
                <MenuItem value="岩手県">岩手県</MenuItem>
                <MenuItem value="山形県">山形県</MenuItem>
                <MenuItem value="宮城県">宮城県</MenuItem>
                <MenuItem value="福島県">福島県</MenuItem>
                <MenuItem value="山梨県">山梨県</MenuItem>
                <MenuItem value="長野県">長野県</MenuItem>
                <MenuItem value="新潟県">新潟県</MenuItem>
                <MenuItem value="富山県">富山県</MenuItem>
                <MenuItem value="石川県">石川県</MenuItem>
                <MenuItem value="福井県">福井県</MenuItem>
                <MenuItem value="茨城県">茨城県</MenuItem>
                <MenuItem value="栃木県">栃木県</MenuItem>
                <MenuItem value="群馬県">群馬県</MenuItem>
                <MenuItem value="埼玉県">埼玉県</MenuItem>
                <MenuItem value="千葉県">千葉県</MenuItem>
                <MenuItem value="東京都">東京都</MenuItem>
                <MenuItem value="神奈川県">神奈川県</MenuItem>
                <MenuItem value="愛知県">愛知県</MenuItem>
                <MenuItem value="静岡県">静岡県</MenuItem>
                <MenuItem value="岐阜県">岐阜県</MenuItem>
                <MenuItem value="大阪府">大阪府</MenuItem>
                <MenuItem value="京都府">京都府</MenuItem>
                <MenuItem value="滋賀県">滋賀県</MenuItem>
                <MenuItem value="奈良県">奈良県</MenuItem>
                <MenuItem value="和歌山県">和歌山県</MenuItem>
                <MenuItem value="岡山県">岡山県</MenuItem>
                <MenuItem value="広島県">広島県</MenuItem>
                <MenuItem value="鳥取県">鳥取県</MenuItem>
                <MenuItem value="島根県">島根県</MenuItem>
                <MenuItem value="山口県">山口県</MenuItem>
                <MenuItem value="徳島県">徳島県</MenuItem>
                <MenuItem value="香川県">香川県</MenuItem>
                <MenuItem value="愛媛県">愛媛県</MenuItem>
                <MenuItem value="高知県">高知県</MenuItem>
                <MenuItem value="福岡県">福岡県</MenuItem>
                <MenuItem value="佐賀県">佐賀県</MenuItem>
                <MenuItem value="長崎県">長崎県</MenuItem>
                <MenuItem value="熊本県">熊本県</MenuItem>
                <MenuItem value="大分県">大分県</MenuItem>
                <MenuItem value="宮崎県">宮崎県</MenuItem>
                <MenuItem value="鹿児島県">鹿児島県</MenuItem>
                <MenuItem value="沖縄県">沖縄県</MenuItem>
              </Select>
            </div>

            <button className="btn">検索</button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Home;
