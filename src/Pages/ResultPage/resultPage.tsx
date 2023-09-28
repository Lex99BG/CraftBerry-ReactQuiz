import Header from "../../components/header/Header";
import resultBackgroundImage from "../../assets/resultPageBG.png";
import Carousel from "../../components/Carousel/carousel";
import "./ResultPage.css";

export const resultPage = () => {
  const headerProps = {
    backgroundImage: resultBackgroundImage,
    title: "Build your everyday self-care routine.",
    introText:
      "Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture. With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances, you can add a moment of calm to the end of your day.",
    buttonText: "Restart the Quiz",
    buttonBackgroundColor: "transparent",
    buttonBorderColor: "1px solid #fff",
    buttonTextColor: "#fff",
  };

  return (
    <div className="ResultPage">
      <Header {...headerProps} />
      <Carousel />
    </div>
  );
};

export default resultPage;
