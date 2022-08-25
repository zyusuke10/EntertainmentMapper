import React, { useState, useEffect } from "react";
import "./EventItem.css";
import axios from "axios";

export const EventItem = ({ name, address, date,favoriteHandler }) => {
  return (
    <div className="event-item-container">
      <div className="event-item">
        <p className="event-item-title">{name}</p>
        <p className="event-item-time">日程:{date}</p>
        <p className="event-item-location">場所:{address}</p>
      </div>
      <div className="event-favorite">
        <button
          type="submit"
          className="favorite-btn"
        >
          お気に入りに追加
        </button>
      </div>
    </div>
  );
};

