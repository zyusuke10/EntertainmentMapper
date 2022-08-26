import { useAppContext } from "../context/appContext";
import "./EventItem.css";
import axios from "axios";
import { useState } from "react";

export const EventItem = ({
  name,
  address,
  date,
  data,
  spotId,
}) => {
  const { setEventClickName, eventClickName } = useAppContext();
  const onClickHandler = (e) => {
    setEventClickName(e.target.outerText);
  };
  const [clickedFavorite, setClickedFavorite] = useState(false);
  let { id } = useAppContext();

  // Number(spotId)
  id = Number(id);

  const ids = {
    user_id: id,
    spot_id: spotId,
  };

  const sendFavoriteHandler = async (e) => {
    e.preventDefault();
    setClickedFavorite(true)
    const { data } = await axios.post(
      "http://localhost:8000/api/favorite_spot/create/",
      ids
    );
  };

  return (
    <div className="event-item-container">
      <div className="event-item">
        <p className="event-item-title" onClick={onClickHandler}>
          {name}
        </p>
        <p className="event-item-time">日程:{date}</p>
        <p className="event-item-location">場所:{address}</p>
      </div>
      <div className="event-favorite">
        <button
          type="submit"
          className="favorite-btn"
          onClick={sendFavoriteHandler}
        >
         {!clickedFavorite ? "お気に入りに追加" : "お気に入り登録済"} 
        </button>
      </div>
    </div>
  );
};
