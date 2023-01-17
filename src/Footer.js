import React, { useEffect } from 'react';
import "./Footer.css";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousOutlinedIcon from '@material-ui/icons/SkipPreviousOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import { Grid, Slider } from '@material-ui/core';

function Footer () {
    const [{ item, playing }, dispatch] = useDataLayerValue();

    const soptifyApi = new SpotifyWebApi( {
        redirectUri: "https://spotify-clone-b8ca0.web.app/",
        clientId: "",
        clientSecret: "",
    } );

    function truncate ( str, n ) {
        return str?.length > n ? str.substr( 0, n - 1 ) + "..." : str;
    }

    useEffect( () => {
        soptifyApi.getMyCurrentPlaybackState().then( ( r ) => {

            dispatch( {
                type: "SET_PLAYING",
                playing: r.is_playing,
            } );
            dispatch( {
                type: "SET_ITEM",
                item: r.item,
            } );
        } );
    }, [soptifyApi, dispatch] );

    const handlePlayPause = () => {
        if ( playing ) {
            soptifyApi.pause();
            dispatch( {
                type: "SET_PLAYING",
                playing: false,
            } );
        } else {
            soptifyApi.play();
            dispatch( {
                type: "SET_PLAYING",
                playing: true,
            } );
        }
    };

    const skipNext = () => {
        soptifyApi.skipToNext();
        soptifyApi.getMyCurrentPlayingTrack().then( ( r ) => {
            dispatch( {
                type: "SET_ITEM",
                item: r.item,
            } );
            dispatch( {
                type: "SET_PLAYING",
                playing: true,
            } );
        } );
    };

    const skipPrevious = () => {
        soptifyApi.skipToPrevious();
        soptifyApi.getMyCurrentPlayingTrack().then( ( r ) => {
            dispatch( {
                type: "SET_ITEM",
                item: r.item,
            } );
            dispatch( {
                type: "SET_PLAYING",
                playing: true,
            } );
        } );
    };
    return (
        <div className="footer">
            <div className="footer__left">
                <img
                    src={item?.album.images[0].url}
                    alt=""
                    className="footer__albumLogo" />
                {item ? (
                    <div className="footer__songInfo">
                        <h4>{truncate( item?.name, 20 )}</h4>
                    </div>
                ) : (
                        <div className="footer__songInfo">
                            <h4>No song is playing</h4>
                            <p>...</p>
                        </div>
                    )}

            </div>

            <div className="footer__center">
                <ShuffleIcon className="footer__green" />
                <SkipPreviousOutlinedIcon onClick={skipNext} className="footer__icon" />
                {playing ? (
                    <PauseCircleOutlineOutlinedIcon
                        onClick={handlePlayPause}
                        fontSize="large"
                        className="footer__iconPlay" />
                ) : (
                        <PlayCircleFilledWhiteOutlinedIcon
                            onClick={handlePlayPause}
                            fontSize="large"
                            className="footer__iconPlay" />
                    )}
                <SkipNextOutlinedIcon onClick={skipPrevious} className="footer__icon" />
                <RepeatRoundedIcon className="footer__green" />
            </div>


            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Slider className="footer__rightslider" />
                    </Grid>
                    <Grid item>
                        <VolumeUpRoundedIcon />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Footer;
