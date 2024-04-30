import "./App.css";
import { useNavigate } from "react-router-dom";

function Questions() {
  const navigate = useNavigate();

  return (
    <div className="mt-3">
      <button 
        className="animated-button mt-4 mb-5 mt-3 text-black cs-btn jump-animation"
        onClick={() => navigate("/questionnaire")}
      >
        <span>Click to be apply</span>
        <span></span>
      </button>
    </div>
  );
}

export default Questions;
