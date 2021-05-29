
import "./App.css";
import React, { useEffect, useState } from "react";
import PasswordManagerContract from './artifacts/contracts/PasswordManager.sol/PasswordManager.json';
import getWeb3 from "./getWeb3";
import BlockchainContext from "./BlockchainContext"
import {Button, Checkbox, Grid, Input} from "@material-ui/core"
import ipfs from './ipfs';
import axios from "axios"
import regex from 'regex'

function Dapp() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [passwordManagerContract, setPasswordManagerContract] = useState(null);
  const [userInputPassword, setUserInputPassword] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [tokenInfo, setTokenInfo] = useState({
    name: "",
    external_link_hash: "",
    description: ""
  });
  const [inputType, setInputType] = useState('password')
  const [buffer, setBuffer] = useState(null);
  const [tokenURIInput, setTokenURIInput] = useState("")
  const PASSWORD_REGEX = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")


  const handleChooseFile = (event) => {
    console.log(event.target)
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    };

  };

  const fecthAllTokens = async () => {

  }
  const passwordInputChangedHandler = (event) => {
    setUserInputPassword(event.target.value)
  }
  const showPasswordClicked = () => {
    setInputType(prevType => prevType === 'password' ? 'text' : 'password');
  }

  const handleSetUserPassword = async () => {
    if (userInputPassword.trim('').length === 0) {
      alert("Password not entered")
    }
    // if (PASSWORD_REGEX.test(userInputPassword) === false) {
    //   console.log(userInputPassword)
    //   alert("Minimum eight characters, at least one letter, one number and one special character")
    // }

    let response = await passwordManagerContract.methods.setPassword(userInputPassword, 'account1').call().then((err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(response)
    })


  }

  const getUserPassword = async() => {
    let password = await passwordManagerContract.methods.getPassword(accounts[0]);
    console.log(password)
    setUserPassword(password)
  }

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        console.log(web3.eth.net.getId());
        console.log(PasswordManagerContract)
        // const networkId = await web3.eth.net.getId();

        const deployedPasswordManager = PasswordManagerContract;

        const passwordInstance = new web3.eth.Contract(
          PasswordManagerContract.abi,
          deployedPasswordManager && deployedPasswordManager.address
        );

        setWeb3(web3);
        setAccounts(accounts);
        setPasswordManagerContract(passwordInstance)
        console.log(accounts)

      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };

    init();

  }, []);

  useEffect(() => {
    const load = async () => {
      await passwordManagerContract

    }
    if (web3 !== null && accounts.length > 0 && passwordManagerContract !== null) {
      load()
    }
  }, [web3, accounts, passwordManagerContract])
  if (web3 === null && accounts.length <= 0 && passwordManagerContract === null) {
    return <div>Loading web3...</div>
  }
  return (
    <BlockchainContext.Provider value={{ web3, accounts, passwordManagerContract, tokenInfo }}>

    <div className="app">

        <div className="home-container">
        <div className="user-address">Hello: {accounts[0]}</div>
          <div className="password">
            {/* <div className="set-password-info-container"> */}
            <input className="password-input" type={inputType } value={userInputPassword} onChange={passwordInputChangedHandler} />
            <button onClick={showPasswordClicked}>Show Password</button>
            <button className="set-password-button" onClick={handleSetUserPassword}>Set password</button>
            <button onClick={getUserPassword}>Get Password</button>
            <span>{userPassword }</span>
              {/* </div> */}
          </div>
          <div className="home-body">
          Welcome to B<strong>Locked Up</strong>
          </div>
        </div>
        {/* <div>Info: { tokenInfo !== null && tokenInfo.name}</div> */}

      </div>
      </BlockchainContext.Provider>
  );
}

export default Dapp;
