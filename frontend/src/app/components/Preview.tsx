import React from 'react';
import Image from 'next/image';
const Preview = () => {
  return <div>
    <div className="h-1 bg-dg-950 mb-10"></div>
    <h2 className="p-0 line-height-none">Aperçu.</h2>
    <h3 className="p-0 mb-20">Une vue d&apos;ensemble sur mon univers créatif</h3>
   
    <div className="grid lg:grid-cols-2">
        <div className="sm:pr-20">
            <p className="mb-10 text-base sm:text-2xl sm:mr-40"> 
                Bonjour ! Je suis Didier Grand, Développeur Front-end chez Scott Sports et actuellement en formation pour devenir Digital Project Manager. <br></br>
                Je suis passionné par le design UX/UI et et mets mes compétences en pratique aussi bien dans des projets pour Scott que dans des missions indépendantes, ce qui me permet d&apos;explorer différents horizons. <br></br>
                Si vous voulez en savoir plus, n&apos;hésitez pas à me contacter à <a href="mailto:dg@digitalgarage.ch" className="text-dg-500 hover:text-dg-300">dg@digitalgarage.ch</a>.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10"> {/* TODO: two cols two rows */}
            <div className="flex flex-col items-center justify-center bg-black rounded-lg text-center p-10 max-w-[60vw] sm:max-w-full">
                <Image src="/skills-dev.png" alt="Front-end Developer" width={280} height={234} className="max-w-full" />
                <h3 className="text-white uppercase">Front-end Developer</h3>
            </div>
            <div className="flex flex-col items-center justify-center bg-black rounded-lg text-center p-10 max-w-[60vw] sm:max-w-full">
                <Image src="/skills-designer.png" alt="UX/UI Designer" width={280} height={234} />
                <h3 className="text-white uppercase">UX/UI Designer</h3>
            </div>
            <div className="flex flex-col items-center justify-center bg-black rounded-lg text-center p-10 max-w-[60vw] sm:max-w-full">
                <Image src="/skills-project.png" alt="Digital Project Manager" width={280} height={234} />
                <h3 className="text-white uppercase">Digital Project Manager</h3>
            </div>
            <div className="flex flex-col items-center justify-center bg-black rounded-lg text-center p-10 max-w-[60vw] sm:max-w-full">
                <Image src="/skills-photgraphy.png" alt="Photographer" width={280} height={234} />
                <h3 className="text-white uppercase">Photographer</h3>
            </div>
        </div>
    </div>
  </div>;
};

export default Preview;