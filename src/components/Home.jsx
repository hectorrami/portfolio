import React from 'react';
import Nav from './Nav';
import Row from './Row';
import Header from './Header';
import Footer from './Footer';
import NetflixClone from '../img/netflixclone.png';

function Home() {
  const images = [NetflixClone, NetflixClone, NetflixClone, NetflixClone];
  return (
    <div>
      <Nav />
      <Header />
      <Row images={images} />
      <Row images={images} />
      <Footer />
    </div>
  );
}

export default Home;
