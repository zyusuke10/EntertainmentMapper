import Menu from "../components/Menu";
import React from "react";
import FavoriteItem from "../components/FavoriteItem";
import axios from "axios"

export const Favorite = () => {
    const fetchFavoriteData = async ()=>{
        const {data} = await axios.get("")
    }


  return (
    <>
      <header>
        <div className="title">
          <h2>娯楽マップ</h2>
          <Menu />
        </div>
      </header>
      {<FavoriteItem />}
    </>
  );
};
