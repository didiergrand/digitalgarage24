import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dg-900 text-dg-300 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">Contact: <a href="mailto:dg@digitalgarage.ch" className="text-dg-300 hover:text-dg-100">dg@digitalgarage.ch</a></p>
        <p className="text-sm">© {new Date().getFullYear()} Digitalgarage – Didier Grand. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;