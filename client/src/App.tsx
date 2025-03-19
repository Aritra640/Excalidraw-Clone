import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { LandingPage } from "./Pages/LandingPage";
import { SignUp } from "./Pages/SignupPage";
import { SignIn } from "./Pages/SigninPage";
import { DashboardPage } from "./Pages/DashboardPage";
import { DrawingBoardPage } from "./Pages/DrawBoardPage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/drawboard" element={<DrawingBoardPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
 
export default App;

