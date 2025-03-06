import React from 'react';
import TiltCard from './TiltCard';

const Preview = () => {
  return <div>
    <div className="h-1 bg-dg-950 mb-10"></div>
    <h2 className="p-0 line-height-none">Aperçu.</h2>
    <h3 className="p-0 mb-20">Une vue d&apos;ensemble sur mon univers créatif</h3>
   
    <div className="grid lg:grid-cols-2">
        <div className="sm:pr-20">
            <p className="mb-10 text-base sm:text-2xl sm:mr-40"> 
                Bonjour ! Je suis Didier Grand, UX/UI Expert chez Scott Sports et Digital Project Manager. <br></br>
                Je suis passionné par le design et mets mes compétences en pratique aussi bien dans des projets pour Scott que dans des missions indépendantes, ce qui me permet d&apos;explorer différents horizons. <br></br>
                Si vous voulez en savoir plus, n&apos;hésitez pas à me contacter à <a href="mailto:dg@digitalgarage.ch" className="text-dg-500 hover:text-dg-300">dg@digitalgarage.ch</a>.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10"> {/* TODO: two cols two rows */}
            <TiltCard />
        </div>
    </div>
  </div>;
};

export default Preview;