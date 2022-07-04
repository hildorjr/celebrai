import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs, doc, setDoc, query, orderBy } from "firebase/firestore";

import styles from '../styles/Home.module.css'

const firebaseConfig = {
  apiKey: "AIzaSyAYW3dB-uktGct6mEdXkj5yXHbNbZGxBmE",
  authDomain: "celebrai-faa05.firebaseapp.com",
  projectId: "celebrai-faa05",
  storageBucket: "celebrai-faa05.appspot.com",
  messagingSenderId: "141637101977",
  appId: "1:141637101977:web:332a620ecf48776b720b08",
  measurementId: "G-D5EDWLPC4K"
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

const Create: NextPage = () => {

  const [numberInput, setNumberInput] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');
  const [contentInput, setContentInput] = useState<string>('');

  const setNumber = (event: any) => {
    setNumberInput(event.target.value);
  };
  const setTitle = (event: any) => {
    setTitleInput(event.target.value);
  };
  const setContent = (event: any) => {
    setContentInput(event.target.value);
  };

  const makeid = (length: number) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const insert = async () => {
    await setDoc(doc(db, 'songs', makeid(20)), {
      album: 'celebrai',
      number: numberInput,
      title: titleInput,
      content: contentInput,
    });
    alert('Salvo');
    setTitleInput('');
    setContentInput('');
  };

  return (
    <>
      <Head>
        <title>Celebrai IELB</title>
        <meta name="description" content="Músicas luteranas na palma da sua mão" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
      </Head>

      <main>
        <section className="hero is-medium is-success">
          <div className="hero-body">
            <div className="container">
              <p className="title">
              Celebrai IELB
              </p>
              <p className="subtitle">
                Inserir música.
              </p>
            </div>
          </div>
        </section>
        {/* <section className="container py-4 px-4">
          <div className="field">
            <div className="control is-medium">
              <input className="input is-medium" type="text" placeholder="Número" value={numberInput} onChange={setNumber} />
            </div>
          </div>
          <div className="field">
            <div className="control is-medium">
              <input className="input is-medium" type="text" placeholder="Título" value={titleInput} onChange={setTitle} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <textarea className="textarea is-medium" placeholder="Letra" value={contentInput} onChange={setContent}></textarea>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={insert}>Salvar</button>
            </div>
          </div>
        </section> */}
      </main>
    </>
  )
}

export default Create
