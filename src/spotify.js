// https://developer.spotify.com/
// decumentation/web-playback-sdk/quick-start///#endregion

export const authEndpoint =
    "https://accounts.spotify.com/authorize";
const redirectUri = "https://spotify-clone-b8ca0.web.app/";
const clientId = "";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
];

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring( 1 )
        .split( "&" )
        .reduce( ( initial, item ) => {
            var parts = item.split( "=" );
            initial[parts[0]] = decodeURIComponent( parts[1] );

            return initial;
        }, {} );
};

export const loginUrl = `${ authEndpoint }?client_id=${ clientId }&redirect_uri=${ redirectUri }&scope=${ scopes.join(
    "%20"
) }&response_type=token&show_dialog=true`;