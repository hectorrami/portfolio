import React from 'react';
import { Avatar } from '@mui/material';
import Me from '../img/me.png';

function Header() {

  return (
      <div className="pt-24 pb-10 flex flex-col items-center dark:bg-gray-900">
        <Avatar className="avatar" alt="Hector Ramirez" src={Me} sx={{ width: 200, height: 200 }}
        />
      </div>
  );
}

export default Header;
