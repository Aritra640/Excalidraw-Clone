import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import { SignUp } from "./Pages/SignupPage";
import { SignIn } from "./Pages/SigninPage";
import { DashboardPage } from "./Pages/DashboardPage";
import { DrawingBoardPage } from "./Pages/DrawBoardPage";
import { Demo } from "./Pages/demoPage";
import { ShapeProvider } from "./store/context";

function App() {
  return (
    <ShapeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/drawboard" element={<DrawingBoardPage />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </Router>
    </ShapeProvider>
  );
}

export default App;
