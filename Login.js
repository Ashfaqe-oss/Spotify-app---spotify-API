import React from 'react';
import "./Login.css";
import { loginUrl } from "./spotify";

function Login() {
    return (
        <div className="login">
            <img
                src="https://www.androidsis.com/wp-content/uploads/2019/10/logo-spotify.jpg"
                alt=""
                className="login__image"
                style={{WebkitMaskRepeat: 'no-repeat'}}
            />
            <a href={loginUrl}>Login with Spotify</a>
        </div>
    )
}

export default Login
