import React from 'react';
import "./Player.css";
import Body from "./Body";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function player(spotify) {
    return (
        <div className="player">
            <div className="player_body">
                <Sidebar />
                <Body />
            </div>
            <Footer />
        </div>
    );
}

export default player;
