import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

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
if (app.name && typeof window !== 'undefined') {
  const analytics = getAnalytics(app);
}
const db = getFirestore(app);

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
    const song = doc.data();
    song.open = false;
    songs.unshift(song);
  });

  return {
    props: {
      songs,
    },
    revalidate: 86400, // 1 day
  }
}

export default Home
