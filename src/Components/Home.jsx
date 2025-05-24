import React from 'react';
import Nav from './Nav';
import Row from './Row';
import Header from './Header';
import Footer from './Footer';
import Experience from './Experience';
import NetflixClone from '../img/netflixclone.png';

function Home() {
  const projects = [
    {
      img: NetflixClone,
      title: 'Netflix Clone',
      githubLink:
        'https://github.com/hectorrami/Neflix-clone/tree/main/netflix-clone',
      previewLink: 'https://netflix-clone-39324.web.app/',
      completed: true,
      description: 'A simple UI clone of Netflix built with React and The Movie Database'
    },
  ];

  return (
    <div>
      <Nav />
      <Header />
      <Row projects={projects} />
      {/* <Experience /> */}
      <Footer />
    </div>
  );
}

export default Home;
