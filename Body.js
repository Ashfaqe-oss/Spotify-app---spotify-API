import React from 'react';
import './Body.css';
import Header from "./Header";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import SongRow from "./SongRow";
import PlayCircleFilledOutlinedIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function Body () {
    const [{ discover_weekly }, dispatch] = useDataLayerValue();
    const spotifyApi = new SpotifyWebApi( {
        redirectUri: "https://spotify-clone-b8ca0.web.app/",
        clientId: "",
        clientSecret: "",
    } );
    function truncate ( str, n ) {
        return str?.length > n ? str.substr( 0, n - 1 ) + "..." : str;
    }

    const playPlaylist = ( id ) => {
        spotifyApi
            .play( {
                context_uri: `spotify:playlist:`
            } )
            .then( ( res ) => {

                spotifyApi.getMyCurrentPlayingTrack().then( ( r ) => {
                    dispatch( {
                        type: "SET_ITEM",
                        item: r.item,
                    } );
                    dispatch( {
                        type: "SET_PLAYING",
                        playing: true,
                    } );
                } );
            } );
    };

    const playSong = ( id ) => {
        spotifyApi
            .play( {
                uris: [`spotify:track:${ id }`],
            } )
            .then( ( res ) => {
                spotifyApi.getMyCurrentPlayingTrack().then( ( r ) => {
                    dispatch( {
                        type: "SET_ITEM",
                        playing: r.item,
                    } );
                    dispatch( {
                        type: "SET_PLAYING",
                        playing: true,
                    } );
                } );
            } );
    };
    return (
        <div className="body">
            <Header spotifyApi={spotifyApi} />
            <div className="body__main">

                <img
                    src={discover_weekly?.images[0].url}
                    alt=""
                    className="body__mainImage"
                />

                <div className="body__mainInfo">
                    <strong>PLAYLIST</strong>
                    <h4>Discover Weekly</h4>
                    <p>{truncate( discover_weekly?.description, 90 )}</p>

                </div>
            </div>

            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledOutlinedIcon className="body__shuffle" onClick={playPlaylist} />
                    <FavoriteIcon className="body__favorite" />
                    <MoreHorizIcon />
                </div>

                {discover_weekly?.tracks.items.map( ( item ) => (
                    <SongRow playSong={playSong} track={item.track} />
                ) )}
            </div>
        </div>
    );
}

export default Body;
