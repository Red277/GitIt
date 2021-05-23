import React from 'react';
import UserInterface from './UserInterface';

class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <div className="ui-header">Gistory
                    <div className="more-info">
                        i
                    <div className="info">Thanks for visiting Gistory! A simple web-app that will take a Github username and generate a timeline of the users public repository activites</div>
                    </div>
                </div>
                <UserInterface />
            </div>
        )
    }
}

export default App;