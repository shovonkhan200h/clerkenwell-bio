import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import CodeGenerate from "./CodeGenerate";
import Questionnaire from "./Questionnaire";
import Ticket from "./Ticket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code-generate" element={<CodeGenerate />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/ticket/:id" element={<Ticket />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
