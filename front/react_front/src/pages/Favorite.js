import Menu from "../components/Menu";
import React, { useState } from "react";
import FavoriteItem from "../components/FavoriteItem";
import axios from "axios";
import { useAppContext } from "../context/appContext";

export const Favorite = () => {
  const [favoriteData, setFavoriteData] = useState([]);
  let { id } = useAppContext();

  id = Number(id);

  const fetchFavoriteData = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/favorite_spot/index/?user_id=12`
    );
    setFavoriteData([data]);
  };

  fetchFavoriteData();

  return (
    <>
      <header>
        <div className="title">
          <h2>エンターテイメントマップ</h2>
          <Menu />
        </div>
      </header>

      {favoriteData.flat().map((item) => {
        const { name, date, address } = item;
        return <FavoriteItem name={name} date={date} address={address} />;
      })}
    </>
  );
};
