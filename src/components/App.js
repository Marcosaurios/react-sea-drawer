import React, { Component } from "react";


import SeaDrawer from './SeaDrawer'


export class App extends Component {
    state = {};


    constructor() {
        super();
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <h1 >Hello React!</h1>
                <SeaDrawer />
            </div>
        );
    }
}

export default App;
