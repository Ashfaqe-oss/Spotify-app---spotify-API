import React from 'react';
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import { useDataLayerValue } from "./DataLayer";

function Sidebar () {
    const [{ playlists }, ] = useDataLayerValue();

    return (
        <div className='sidebar'>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWwSDcPB5BiNYYBFYC9kcG8st464LzORMRsA&usqp=CAU"
                alt=""
                className="sidebar_img" />
            <SidebarOption title="Home" Icon={HomeIcon} />
            <SidebarOption title="Searh" Icon={SearchIcon} />
            <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
            
            <h3>Playlists</h3>

            {playlists?.items?.map( playlist => (
                <SidebarOption title={playlist.name} />
            ))}
        </div>
    )
}

export default Sidebar;
