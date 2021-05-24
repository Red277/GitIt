import './RepoNode.css';
import { useState} from 'react';
import { RiGitRepositoryFill } from 'react-icons/ri';
import { Octokit } from "@octokit/rest";
import CommitNode from './CommitNode';

function RepoNode(props) {
    const repoData = props.repoData;
    const [isCommitsVisible, setIsCommitsVisible] = useState(false);


    const [commitData, setCommitData] = useState([]);
    const [hasRetrievedCommits, setHasRetrievedCommits] = useState(false);


    let octokit = new Octokit({});
    const onClickToolTip = () => {
        if (!hasRetrievedCommits) {
            octokit.rest.repos.listCommits({
                owner: repoData.owner.login,
                repo: repoData.name,
                author: repoData.owner.login
            }).then(({ data }) => {
                console.log(data);
                setCommitData(data);
                setHasRetrievedCommits(true);

                setIsCommitsVisible(!isCommitsVisible);
            }).catch((e) => {
                console.log(e);
            });
        } else {
            console.log('commits already retrieved');
            setIsCommitsVisible(!isCommitsVisible);
        }

        
    }

    return (
        <div className="repo-info">
            <div className="repo-info-left">
                {(repoData.owner.login === props.userData.login) &&
                    <div style={{ position: 'absolute', top: '4px', left: '4px', background: 'green', width: '10px', height: '10px', borderRadius: '50%', zIndex: '50' }}></div>
                }
                <div className="repo-icon">
                    <RiGitRepositoryFill />
                    <div className="tooltip" onClick={onClickToolTip}>Show commits</div>
                </div>
                <div><span style={{ fontSize: '15px', fontWeight: '500', color: 'var(--color-text)', textAlign: 'center' }}>{repoData.created_at.split('T')[0]}</span></div>
                <div className="repo-hover-info">
                    <div style={{ color: 'var(--color-text)' }}>{repoData.name}</div>
                    <div style={{marginTop:'3px', width:'100%', color: 'var(--color-text-grey)', fontSize: '12px', wordBreak:'break-word'}}>{repoData.description} </div>
                </div>
            </div>

            {isCommitsVisible && 
                <div className='repo-info-right'>
                    <div className='more-info small'>i
                        <div className="info small"> All commits shown are by {repoData.owner.login}. Max 50 </div>
                    </div>
                    {(commitData.length > 0) ? 
                        <>
                            {commitData.map((commit) => {
                                return <CommitNode commitData={commit}/>
                            })}
                        </>
                    : <div>No commits available</div>
                    
                    } 
                </div>
            }
        </div>
    )
}

export default RepoNode;