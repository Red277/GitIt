import { useEffect, useState } from 'react';
import './UserInterface.css';
import { Octokit } from "@octokit/rest";
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";

import { RiGitRepositoryFill } from 'react-icons/ri';



function UserInterface() {
    const [user, setUser] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState({});

    const MyOctokit = Octokit.plugin(retry, throttling);
    let octokit = new MyOctokit({
        baseUrl: 'https://api.github.com',
        log: console,
        throttle: {
            onRateLimit: (retryAfter, options) => {
                octokit.log.warn(
                    `Request quota exhausted for request ${options.method} ${options.url}`
                );

                // Retry twice after hitting a rate limit error, then give up
                if (options.request.retryCount <= 2) {
                    console.log(`Retrying after ${retryAfter} seconds!`);
                    alert(`Retrying after ${retryAfter} seconds!`);
                    return true;
                }
            },
            onAbuseLimit: (retryAfter, options) => {
                // does not retry, only logs a warning
                alert('Abuse detected for request');
                octokit.log.warn(
                    `Abuse detected for request ${options.method} ${options.url}`
                );
            },
        },

    });
    let timeout = null;
    // useEffect(() => {

    // }, [isClicked]);
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const retrieveUserInfo = () => {

        console.log(user);

        octokit.rest.users.getByUsername({
            username: user,
            sort: 'updated'
        }).then(({ data }) => {
            console.log(data);
            setUserData(data);

            octokit.rest.repos.listForUser({
                username: user,
                sort: 'updated'
            }).then(({ data }) => {
                console.log(data);
                setData(data);
    
            }).catch((e) => {
                console.log(e);
            });

        }).catch((e) => {
            console.log(e);
        });

        setIsClicked(true);

        clearTimeout(timeout);
        timeout = setTimeout(function () { setIsClicked(false); }, 2000);


    }

    return (
        <div className="page-bg">
            <div className="page-content">
                {( !(isEmpty(userData)) ) ?
                    <>
                        <div className="user-info-container">
                            <img src={userData.avatar_url} alt='No Image' className="user-pic"></img>
                            <div style={{display:'grid', gridTemplateColumns:'repeat(4,auto)', gridTemplateRows:'auto auto', gridAutoFlow:'column', alignItems:'end'}}>
                                <div><span style={{fontSize:'20px', fontWeight:'600', color:'var(--color-text)'}}>{userData.name}</span></div>
                                <div><span style={{fontSize:'15px', fontWeight:'500', color:'var(--color-text)'}}>{userData.login}</span></div>
                                <div><span style={{fontSize:'15px', fontWeight:'500', color:'var(--color-text)'}}>User since: {userData.created_at.split('T')[0]}</span></div>
                                <div><span style={{fontSize:'15px', fontWeight:'500', color:'var(--color-text)'}}>Public Repos: {userData.public_repos}</span></div>
                            </div>
                        </div>

                        <div className="repos-container">
                            <div className="repo-info">
                                <div className="repo-info-left">
                                    <div className="repo-icon">
                                        <RiGitRepositoryFill />
                                        <div className="tooltip">Show commits</div>
                                    </div>
                                    <div><span style={{fontSize:'15px', fontWeight:'500', color:'var(--color-text)', textAlign:'center'}}>09-02-2019</span></div>
                                    <div className="repo-hover-info">
                                        Hover-Info
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="repo-info">Info box</div>
                        
                        </div>
                    </>
                    :
                    <div className="ui-container">
                        <div className="ui-input">
                            <div style={{ display: 'grid', gridTemplateRows: "auto auto auto auto", rowGap: '10px', justifyItems: 'center' }}>
                                <div className="ui-input-label">Github Username</div>
                                <input className="ui-input-textbox" type='text' onChange={(e) => { setUser(e.target.value) }} value={user}></input>
                                <div onClick={retrieveUserInfo} className="ui-input-button">Generate</div>
                                {isClicked &&
                                    <div className='ui-input-button error'>NO USER DATA</div>
                                }
                            </div>

                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default UserInterface;