import React from "react";
import Header from "../../components/header/Header";
import homeBackgroundImage from "../../assets/homePageBG.png";

function Home() {
  const headerProps = {
    backgroundImage: homeBackgroundImage,
    title: "Build a self care routine suitable for you",
    introText:
      "Take out test to get a personalised self care routine based on your needs.",
    buttonText: "Start Home Quiz",
    buttonBackgroundColor: "lightblue",
    buttonBorderColor: "blue",
    buttonTextColor: "#1C2635",
  };

  return (
    <div>
      <Header {...headerProps} />
    </div>
  );
}

export default Home;
