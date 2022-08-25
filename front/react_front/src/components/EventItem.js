import { useAppContext } from "../context/appContext";
import "./EventItem.css";
import axios from "axios";

export const EventItem = ({
  name,
  address,
  date,
  addMarker,
  data,
  setEventClickName,
  eventClickName,
  spotId,
}) => {
  const { setIsClear } = useAppContext();
  const onClickHandler = (e) => {
    setEventClickName(e.target.name);
    addMarker(eventClickName, data);
  };
  let { id } = useAppContext();

  // Number(spotId)
  id = Number(id);

  const ids = {
    userId: id,
    spotId: spotId,
  };


  const sendFavoriteHandler = async (e) => {
    e.preventDefault();
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
          お気に入りに追加
        </button>
      </div>
    </div>
  );
};
