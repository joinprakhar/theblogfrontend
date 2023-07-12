import React, { useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);




  return (
    <main>
      <Header show={showMediaIcons} />
      <div onClick={() => setShowMediaIcons(false)}>
        <Outlet />
      </div>
    </main>
  );
}

export default Layout

