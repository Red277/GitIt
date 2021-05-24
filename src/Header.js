// import { useState, useEffect } from 'react';
import './Header.css'
import SiteThemeSelector from './SiteThemeSelector';

function Header(props) {
    return (
        <div className="ui-header">
            <div className="ui-header-left"><SiteThemeSelector/></div>
            <div className='ui-header-title'>Gistory</div>
            <div className="more-info">
                <div>i
                    <div className="info">Thanks for visiting Gistory! A simple web-app that will take a Github username and generate a timeline of the users public repository activites</div>
                </div>
            </div>
        </div>
    )
}
export default Header;