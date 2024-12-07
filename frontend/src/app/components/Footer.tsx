import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dg-950 text-dg-100 p-4">
      <div className="container mx-auto">
        <h2 className="p-0 mt-10 line-height-none">Contact.</h2>
        <h3 className="p-0 mb-10">Contactez-moi pour commencer une nouvelle aventure créative</h3>
        <p className="text-base sm:text-xl mb-10">Didier Grand<br /><a href="mailto:dg@digitalgarage.ch" className="text-dg-100 hover:text-dg-400">dg@digitalgarage.ch</a></p>
        <p className="text-base sm:text-xl mb-10">© {new Date().getFullYear()} Digitalgarage – Didier Grand. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;