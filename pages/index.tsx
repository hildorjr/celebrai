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

// setDoc(doc(db, "songs", 'H4IWQT7FLrQZYAxCknGJ'), {
//   album: "celebrai",
//   number: "5",
//   title: "A Solução",
//   content: "Há ainda uma esperança Para mudar o nosso mundo. É fácil de encontrar, basta procurar... É algo que tudo supera, suporta e perdoa, Aumenta a paz e a comunhão. \n Há muito tempo existe a solução Mas muitos não descobriram Pois traz dignidade e compaixão. Vou lhes contar essa solução Para o mundo em que vivemos E ela nada mais é do que o amor.\n O amor, o amor de Deus. O amor tudo supera, perdoa e respeita. Sem ele o mundo não tem mais salvação. O amor tudo supera, perdoa e respeita. Amemos nosso irmão, como a nós mesmos. O amor de Deus é a solução. ",
// });

const Home: NextPage = ({ songs }: any) => {

  const [filteredSongs, setFilteredSongs] = useState<any[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>('');


  const searchSongs = (event?: any) => {
    const search = event?.target.value || '';
    setSearchInputValue(search);
    setFilteredSongs(
      songs.filter((song: any) => {
        return song.title.toLowerCase().includes(search.toLowerCase()) ||
               song.content.toLowerCase().includes(search.toLowerCase()) ||
               song.number == search;
      })
    );
  };

  useEffect(() => {
    searchSongs();
  }, [])

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
                Encontre uma das {songs.length} músicas.
              </p>
              <div className="field">
                <div className="control is-medium">
                  <input className="input is-medium" type="text" placeholder="Procure pela música..." value={searchInputValue} onChange={searchSongs} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-4 px-4">
        { filteredSongs.map((song) =>
          <div className="card mt-5" key={song.number}>
            <header className="card-header">
              <p className="card-header-title">{song.number}. {song.title}</p>
            </header>
            <div className="card-content">
              <p style={{ whiteSpace: 'pre-line' }}>
                {song.content.replace(/\\n/g, '\n')}
              </p>
            </div>
          </div>
        ) }
        </section>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const songsRef = collection(db, 'songs');
  const querySnapshot = await getDocs(query(songsRef, orderBy('number', 'desc')));
  const songs: any[] = [];
  querySnapshot.forEach((doc) => {
    songs.unshift(doc.data())
  });

  return {
    props: {
      songs,
    },
  }
}

export default Home
