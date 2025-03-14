import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { LandingPage } from "./Pages/LandingPage";
import { SignUp } from "./Pages/SignupPage";
import { SignIn } from "./Pages/SigninPage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
 
export default App;

