import React, { useState, useEffect } from "react";
import "./EventItem.css";
import axios from "axios";

export const EventItem = () => {

  return (
    <div className="event-item">
      <p className="event-item-title">イベント名</p>
      <p className="event-item-time">日時:19時00分~</p>
      <p className="event-item-location">場所:東京</p>
    </div>
  );
};

