import {useState, useEffect} from 'react';
import './CommitNode.css'

// class InfoNode  extends React.Component {
//     constructor() {
//         super();
//     }

//     render() {
//         return (<div></div>)
//     }
// }

function CommitNode(props) {
    const commitData = props.commitData;

    return (
        <div className='commit'>
            <div className="commit-hover-info">
                
            </div>
        </div>
    )
}
export default CommitNode;