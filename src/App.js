import React, { useEffect } from 'react';
import './App.css';
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App () {

  const [{ token }, dispatch] = useDataLayerValue();
  //runs code on a given condition.abs
  useEffect( () => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if ( _token ) {
      spotify.setAccessToken( _token );

      dispatch( {
        type: "SET_TOKEN",
        token: _token,
      } );

      //testing
      spotify.getMe().then( ( user ) => {
        dispatch( {
          type: "SET_USER",
          user,
        } );
      } );

      dispatch( {
        type: "SET_SPOTIFY",
        spotify: spotify,
      } );
      spotify.getUserPlaylists().then( ( playlists ) => {
        dispatch( {
          type: "SET_PLAYLISTS",
          playlists,
        } );
      } );

      spotify.getMyTopArtists().then( ( response ) =>
        dispatch( {
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        } )
      );

      spotify.getPlaylist( "" ).then( ( discover_weekly ) => {
        dispatch( {
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: discover_weekly,
        } );
      } );
    }
  }, [token, dispatch] );

  return (
    <div className="App">
      {
        token ? (
          <Player />
        ) : (
            <Login />
          )
      }
    </div>
  );
}

export default App;