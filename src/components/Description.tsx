import React, { FC } from "react";
import { AiOutlineDown } from "react-icons/ai";
import "../styles/description.scss";

const Description: FC = () => {
  return (
    <div className="description-container">
      <p>Turn up the volume and tap to start the track!</p>
      <AiOutlineDown />
    </div>
  );
};
Description.displayName = "Description";
export default Description;
