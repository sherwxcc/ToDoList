import "./landingPage.css";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const LandingPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center landing-page">
      <div className="container landing-card row p-5">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <LoginForm />
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
