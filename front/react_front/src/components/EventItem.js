import { useAppContext } from "../context/appContext";
import "./EventItem.css";

export const EventItem = ({
  name,
  address,
  date,
  addMarker,
  data,
  setEventClickName,
  eventClickName,
}) => {
  const { setIsClear } = useAppContext();
  const onClickHandler = (e) => {
    setEventClickName(e.target.name);
    addMarker(eventClickName, data);
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
        <button type="submit" className="favorite-btn">
          お気に入りに追加
        </button>
      </div>
    </div>
  );
};
