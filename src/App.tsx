import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/homePage";
import QuizPage from "./Pages/QuizPage/quizPage";
import ResultPage from "./Pages/ResultPage/resultPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
