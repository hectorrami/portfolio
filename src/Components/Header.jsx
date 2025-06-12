import React from 'react';
import { Avatar } from '@mui/material';
import headshot from '../img/headshot.png';

function Header() {

  return (
      <div className="pt-24 pb-10 flex flex-col items-center dark:bg-gray-900">
        <Avatar className="avatar" alt="Hector Ramirez" src={headshot} sx={{ width: 200, height: 200 }}
        />
      </div>
  );
}

export default Header;
