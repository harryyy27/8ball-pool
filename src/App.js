import React, { Component } from 'react';
import styled, {css} from 'styled-components';
// import Welcome from './components/welcome';
// import Game from './components/game';
import Loadable from 'react-loadable';
// import logo from './logo.svg';

const Welcome = Loadable({
  loader: ()=> import('./components/welcome'),
loading(){ return <h1>LOADING</h1> }
})
const Game = Loadable({
  loader: ()=> import('./components/game'),
  loading(){ return <h1>LOADING</h1>}
})

class App extends Component {
  state = {
    welcome: true
  }
  toggleWelcome = () => {
    this.setState((prevState)=>{
      return {welcome: !prevState.welcome}
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        
        </header>
        { this.state.welcome ?
        <Welcome handlePlay={this.toggleWelcome}/> :
        <Game />
        }
      </div>
    );
  }
}

export default App;
