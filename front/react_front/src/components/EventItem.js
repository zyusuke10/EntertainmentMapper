import React from "react";
import "./EventItem.css";

export const EventItem = ({ name, address, date }) => {
  return (
    <div className="event-item-container">
      <div className="event-item">
        <p className="event-item-title">{name}</p>
        <p className="event-item-time">日時:{date}</p>
        <p className="event-item-location">場所:{address}</p>
      </div>
      <div className="event-favorite">
        <button type="submit" className="favorite-btn">お気に入りに追加</button>
      </div>
    </div>
  );
};
