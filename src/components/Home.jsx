import React from 'react';
import Nav from './Nav';
import Row from './Row';
import Header from './Header';
import Footer from './Footer';
import Experience from './Experience';
import NetflixClone from '../img/netflixclone.png';
import AmazonClone from '../img/amazonclone.png';

function Home() {
  const projects = [
    { img: NetflixClone, title: 'Netflix Clone' },
    { img: AmazonClone, title: 'Amazon Clone' },
  ];
  return (
    <div>
      <Nav />
      <Header />
      <Row projects={projects} />
      <Experience />
      <Footer />
    </div>
  );
}

export default Home;
