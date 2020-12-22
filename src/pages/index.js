import React from "react";
import styled from 'styled-components';

import firebase from 'firebase/app';
import 'firebase/database'

import { useObject } from 'react-firebase-hooks/database'

firebase.initializeApp({
  apiKey: "AIzaSyB4EvkihIKHsLD6K4FPkNgf77Sv-8-uLf4",
  authDomain: "cml-homekit.firebaseapp.com",
  databaseURL: "https://cml-homekit.firebaseio.com",
  projectId: "cml-homekit",
  storageBucket: "cml-homekit.appspot.com",
  messagingSenderId: "740447413592",
  appId: "1:740447413592:web:636bf871e194719bb5f12d"
});

const db = firebase.database();

const Wrapper = styled.div`
  background-color: #dce8ef;
  display: flex;
  max-width: 768px;
  margin: 0 auto;
  padding: 0 25px;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const Btn = styled.button`
    outline: none;
    border-radius: 50px;
    background: #fdfdfd;
    border: 5px solid #abb8bf;
    color: #85a1b1;
    width: 200px;
    height: 200px;
    font-size: 24px;
    box-shadow: 0 15px 25px #b4c3cc;
    padding: 0;
    cursor: pointer;
    transition: box-shadow .15s ease-in-out;

  & > div{
    width: 100%;
    height: 100%;
    box-shadow: inset 0 -10px 0 #e5eef3;
    border-radius: 42px;
    display: flex;
    align-items: flex-end;
    padding: 32px;
    box-sizing: border-box;
    transition: box-shadow .15s ease-in-out;

    & > p {
      padding: 0;
      margin: 0;
    }
  }

  &:active{
    box-shadow: none;
  }

  &:active > div{
    box-shadow: none;
  }
`

const InfoBar = styled.div`
  margin-bottom: 30px;
  text-align: center;
  font-size: 16px;
`

export default function Home() {

  const [computer_wol, loading, error] = useObject(firebase.database().ref().child('computer_wol'));
  const [computer_status, loading2, error2] = useObject(firebase.database().ref().child('computer_status'));

  const actionTurnOn = (e) => {

    e.preventDefault();
    db.ref().update({ computer_wol: true });

  }

  let status = 'wyłączony';
  if( computer_status ){
    status = ( computer_status.val() === true ) ? 'włączony' : 'wyłączony';
  }

  return (
    <div>
      <Wrapper>
        <div>
          <InfoBar>
            <p>Komputer jest {status}</p>
          </InfoBar>
          <Btn onClick={actionTurnOn} >
            <div>
              <p>Włącz</p>
            </div>
          </Btn>
        </div>
      </Wrapper>
    </div>
  );
}
