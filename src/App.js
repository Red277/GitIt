import React from 'react';
import UserInterface from './UserInterface';
import Header from './Header';

class App extends React.Component {
    render() {
        return (
            <div style={{background:'var(--color-background)', overflow:'auto', minHeight:'50rem'}}>
                <Header />
                <UserInterface />
            </div>
        )
    }
}

export default App;