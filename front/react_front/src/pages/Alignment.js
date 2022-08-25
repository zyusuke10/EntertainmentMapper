import React, { Fragment } from "react";

import "./Alignment.css";
import Icon from './google.png'


const Alignment = () => {

  return (
    <Fragment>
      <header>
        <div className="title">
          <h2>Googleカレンダー連携</h2>
          
        </div>
      </header>

      <div className="main">
                <div className="mail">
                    <p>連携しているメールアドレス</p>
                    <p className = "address">******@gmail.com</p>
                </div>
                <div class ="btn_lists">
                    <ul>
                        <li class="btn_list"><a href="#" class="btn1"><img class="text_img" src={Icon} ></img>Googleと連携</a></li>
                        <li class="btn_list"><a href="#" class="btn2">連携を解除</a></li>
                    </ul>
                   
                </div>
        </div>

      
    </Fragment>
  );
};

export default Alignment;