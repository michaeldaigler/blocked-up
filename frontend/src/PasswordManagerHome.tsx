
import React, { ChangeEvent, useEffect, useContext, useState } from "react";
import { PasswordManagerContext, SignerContext } from "./hardhat/SymfoniContext"
import BLockedUpLogo from "./assets/BlockedUpLogo.png"
import { encrypt, decrypt, encryptPassword, decryptPassword } from "./encryption/passwordEncryption";
import {recoverPersonalSignature} from "eth-sig-util"
import "./PasswordManager.css"
import { Signer } from "crypto";
import { bitArray } from "sjcl";
import { sha224 , sha256} from "js-sha256";
import { SigningKey } from "@ethersproject/signing-key";
import { ethers } from "ethers";

const PasswordManagerHome: React.FC = () => {
    const [accounts, setAccounts] = useState([]);
    const passwordManagerContract = useContext(PasswordManagerContext)
    const signerContext = useContext(SignerContext);

    const [userInputPassword, setUserInputPassword] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [inputType, setInputType] = useState('password')
    const [_provider, setProvider] = useState(ethers.providers.Web3Provider.prototype);
    const [_signer, setSigner] = useState('');
    useEffect(() => {
        const setUpWeb3 = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const jsonRpcProvider = new ethers.providers.JsonRpcProvider()
             jsonRpcProvider.listAccounts().then((res: string[]) => {
                setSigner(res[0]);
            })

            console.log(jsonRpcProvider.listAccounts())
        }

        setUpWeb3();
        console.log(_signer)
    },[passwordManagerContract])

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


          if (!passwordManagerContract.instance) {
              console.log("No password manager")
              return;
          }
          if (passwordManagerContract.instance) {
            //   let x = sha256(userInputPassword)
            //   let y = sha256('account1')
            //   let z = sha256(x.concat(y))
              let x = encryptPassword(userInputPassword, _signer)
              console.log('[SIGNER]', _signer)
            let tx = await passwordManagerContract.instance.setPassword(x, 'account1')
              await tx.wait()
              console.log(tx)
          }



      }

    const getUserPassword = async () => {
        if (passwordManagerContract.instance !== undefined) {
            console.log(passwordManagerContract.factory?.signer)
            let password = await passwordManagerContract.instance.getPassword('account1');
            console.log(password)
            console.log('[SIGNER]', _signer)
            let decryptedPassword = decryptPassword(password, _signer)
            if (password !== undefined) {
                console.log(decryptedPassword)
                setUserPassword(decryptedPassword)
            }
        }
      }
    return (
        <div className="app">

        <div className="home-container">

        <div className="user-address">Hello: {_signer}</div>
          <div className="password">
            {/* <div className="set-password-info-container"> */}
            <input className="password-input" id="passowrd" type={inputType } value={userInputPassword} onChange={passwordInputChangedHandler} />
            <button onClick={showPasswordClicked}>Show Password</button>
            <button className="set-password-button" onClick={handleSetUserPassword}>Set password</button>
            <button onClick={getUserPassword}>Get Password</button>
           <div> Your password: <span>{userPassword}</span></div>
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