import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

interface HeaderProps {
  backgroundImage: string;
  title: string;
  introText: string;
  buttonText: string;
  buttonBackgroundColor: string;
  buttonBorderColor: string;
  buttonTextColor: string;
}

function Header({
  backgroundImage,
  title,
  introText,
  buttonText,
  buttonBackgroundColor,
  buttonBorderColor,
  buttonTextColor,
}: HeaderProps) {
  const headerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const buttonStyle = {
    backgroundColor: buttonBackgroundColor,
    color: buttonTextColor,
    border: buttonBorderColor,
  };

  return (
    <header style={headerStyle}>
      <div className="intro">
        <h1>{title}</h1>
        <p>{introText}</p>
        <Link to="/quiz">
          <button style={buttonStyle}>{buttonText}</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
