import { useSelector } from "react-redux";
import "./HomePage.css";
const HomePage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser || sessionUser) {
    return (
      <div id="page-container">
        <div id="whatever">
          <div id="welcome-container">
            <h1>WELCOME TO TUNENIMBUS</h1>
            <h3>What's next in music is first on TuneNimbus</h3>
            <h5 id="para">
              Upload your first track and begin your journey. TuneNimbus gives
              you space to create, find your fans, and connect with other
              artists.
            </h5>
            <h4>Start your journey today!</h4>
          </div>
        </div>
        <div className="middle-container">
          <span>
            <img src="https://i.imgur.com/CcYDFxL.png"></img>
          </span>
          <span className="middle-text">
            <h1>Never stop listening</h1>
            <h2>
              TuneNimbus is not yet available on Web, iOS, Android, Sonos,
              Chromecast, or Xbox One. We're still working on that, but
              you can look forward to its release on February 32nd, 3023!
            </h2>
          </span>
        </div>
        <div className="bottom-container">
          <div id="shader">
            <div className="bottom-text">
            <h1>Calling All Creators</h1>
            <h2>Get on TuneNimbus to connect with fans,
                share your sounds, and grow your audience.
                What are you waiting for? Join up to one other
                user on the site and start your music career!
            </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default HomePage;
