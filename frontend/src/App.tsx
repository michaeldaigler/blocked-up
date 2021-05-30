import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Symfoni } from "./hardhat/SymfoniContext";
import { Greeter } from './components/Greeter';
import PasswordManagerHome from './PasswordManagerHome';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true} >
         <PasswordManagerHome></PasswordManagerHome>
          {/* <Greeter></Greeter> */}
        </Symfoni>
      </header>
    </div>
  );
}

export default App;
