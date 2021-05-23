import { useEffect, useState } from 'react';
import './UserInterface.css';
import { Octokit } from "@octokit/rest";




function UserInterface() {
    const [user, setUser] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [data, setData] = useState([]);

    let octokit = new Octokit({ baseUrl: 'https://api.github.com', log: console });
    let userRepos;
    // useEffect(() => {

    // }, [isClicked]);

    const retrieveUserInfo = () => {
        console.log(user);
        octokit.rest.repos.listForUser({
            username: user,
            sort: 'updated'
        }).then(({ data }) => {
            console.log(data);
            setData(data);

        }).catch((e) => {
            console.log(e);
        });

        setIsClicked(true);


    }

    return (
        <div className="ui-container">
            


            {(data.length > 0) ?
                <div>{data.length}</div>
                :
                <div className="ui-input">
                    <div style={{ display: 'grid', gridTemplateRows: "auto auto auto", rowGap: '10px', justifyItems: 'center' }}>
                        <div className="ui-input-label">Github Username</div>
                        <input className="ui-input-textbox" type='text' onChange={(e) => { setUser(e.target.value) }} value={user}></input>
                        <div onClick={retrieveUserInfo} className="ui-input-button">Generate</div>
                        {isClicked &&
                            <div>NO USER DATA</div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default UserInterface;