import "./../index.css";
// import { Button } from "@mui/material";
import backgroundImage from "./../assests/background.jpg";

function getLogin() {
    window.location.href = "http://localhost:3000/auth";
}

function Home() {
    return (
        <div className="home" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <button className="auth-btn" onClick={getLogin}>Let's Get Started</button>
        </div>
    );
}

export default Home;