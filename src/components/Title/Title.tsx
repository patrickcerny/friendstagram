import React from "react";
import "./Title.scss";

interface TitleProps {
  label: string;
}
const Title = ({ label }: TitleProps) => {
  return (
    <div className="title">
      <div>{label}</div>
    </div>
  );
};

export default Title;
