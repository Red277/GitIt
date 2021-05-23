import React from 'react';
import UserInterface from './UserInterface';
import Header from './Header';
import { auto } from 'async';

class App extends React.Component {
    constructor() {
        super()
    }

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