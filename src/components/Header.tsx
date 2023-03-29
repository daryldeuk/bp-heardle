import React, { FC } from "react";
import { BsExclamationCircle, BsFileBarGraph, BsHeart, BsQuestionCircle } from "react-icons/bs";
import "../styles/header.scss";

const Header: FC = () => {
  return (
    <header className="header-container">
      <div className="header-details">
        <div className="header-details-alignment">
          <div className="button-left-container">
            <button>
              <BsExclamationCircle />
            </button>
            <button>
              <BsHeart />
            </button>
          </div>
          <div className="header-title">
            <h1>BLACKPINK Heardle</h1>
          </div>
          <div className="button-right-container">
            <button>
              <BsFileBarGraph />
            </button>
            <button>
              <BsQuestionCircle />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
Header.displayName = "Header";
export default Header;
