
import React, { ChangeEvent, useContext, useState } from "react";
import { PasswordManagerContext } from "./hardhat/SymfoniContext"
import BLockedUpLogo from "./assets/BlockedUpLogo.png"
import Button from 'react-bootstrap/Button';

import "./PasswordManager.css"


const PasswordManagerHome: React.FC = () => {
    const [accounts, setAccounts] = useState([]);
    const passwordManagerContract = useContext(PasswordManagerContext)

    const [userInputPassword, setUserInputPassword] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [inputType, setInputType] = useState('password')

    // useEffect(() => {
    //     const doAsync = async () => {
    //         if (!passwordManagerContract.instance) return
    //         console.log("Greeter is deployed at ", passwordManagerContract.instance.address)
    //         setUserPassword(await passwordManagerContract.instance.getPassword('account1'))

    //     };
    //     doAsync();
    // },[passwordManagerContract])

    const PASSWORD_REGEX = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")
    const passwordInputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInputPassword(event.target.value)
      }
      const showPasswordClicked = () => {
        setInputType(prevType => prevType === 'password' ? 'text' : 'password');
      }


      const handleSetUserPassword = async () => {
        if (userInputPassword.trim().length === 0) {
          alert("Password not entered")
        }
          console.log(passwordManagerContract)
        // if (PASSWORD_REGEX.test(userInputPassword) === false) {
        //   console.log(userInputPassword)
        //   alert("Minimum eight characters, at least one letter, one number and one special character")
        // }
          if (!passwordManagerContract.instance) {
              console.log("No password manager")
              return;
          }
          if (passwordManagerContract.instance) {
            let tx = await passwordManagerContract.instance.setPassword(userInputPassword, 'account1')
              await tx.wait()
              console.log(tx)
          }



      }

    const getUserPassword = async () => {
        if (passwordManagerContract.instance !== undefined) {
            console.log(passwordManagerContract.factory?.signer)
            let password = await passwordManagerContract.instance.getPassword('account1');
            console.log(password)
            if (password !== undefined) {
                setUserPassword(password)
            }
        }
      }
    return (
        <div className="app">

        <div className="home-container">
                <div className="user-address">Hello: {accounts[0]}</div>
          <div className="password">
            {/* <div className="set-password-info-container"> */}
            <input className="password-input" type={inputType } value={userInputPassword} onChange={passwordInputChangedHandler} />
            <Button onClick={showPasswordClicked} variant="secondary">Show password</Button>{' '}
            <Button onClick={handleSetUserPassword} variant="primary">Set password</Button>{' '}
            <Button onClick={getUserPassword} variant="success">Get password</Button>{' '}
            <span>{userPassword}</span>
              {/* </div> */}
          </div>
          <div className="home-body">
            <p style={{width: "500px"}}>Welcome to B<strong>Locked Up</strong></p>
            <img src={BLockedUpLogo }/>
        </div>

        </div>
        {/* <div>Info: { tokenInfo !== null && tokenInfo.name}</div> */}

      </div>
    )
}

export default PasswordManagerHome;