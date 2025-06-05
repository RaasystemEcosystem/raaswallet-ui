import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const BaseLayout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
