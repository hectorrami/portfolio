import React from 'react';
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import NetflixClone from '../img/netflixclonest.png';
import AboutExperience from './AboutExperience';

function Home() {
  return (
    <div>
      <Nav />
      <Header />
      <AboutExperience />
      <Footer />
    </div>
  );
}

export default Home;
