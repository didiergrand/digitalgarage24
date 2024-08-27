import { sanityFetch } from "@/sanity/client";
import Image from "next/image";

interface AboutPageType {
  _id: string;
  title: string;
  pageBuilder: Array<{
    _type: string;
    heading?: string;
    tagline?: string;
    excerpt?: string;
  }>;
  image1?: string;
}
async function getAboutPage() {
  const query = `*[_type == "page" && slug.current == "about"][0]{
    _id,
    title,
    pageBuilder[]{
      _type == 'textWithIllustration' => {
        _type,
        heading,
        tagline,
        excerpt
      },
    },
    "image1": image1.asset->url
  }`;
  const aboutPage = await sanityFetch({ query });
  return aboutPage;
}


const AboutPage = async () => {
  const aboutPage = await getAboutPage();

  if (!aboutPage) {
    return <div>Page content not found.</div>;
  }
  return (
    <div className="grid grid-cols-2 min-h-[100vh]">
      {/* Colonne gauche pour le texte et autre contenu */}
      <div className="p-8 pt-48">
        <h1 className="text-4xl tracking-tighter mb-8 uppercase">{aboutPage.title}</h1>
        {aboutPage.pageBuilder.map((block, index) => {
          switch (block._type) {
            
            case 'textWithIllustration':
              return (
                <div key={index} className="mb-8">
                  <p>
                    {block.excerpt}
                  </p>
                </div>
              );
            case 'hero':
              return (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl">{block.title}</h2>
                  <p>{block.subtitle}</p>
                </div>
              );
            case 'gallery':
              return (
                <div key={index} className="mb-8">
                  {block.images.map((image) => (
                    <Image
                      key={image.asset._id}
                      src={image.asset.url}
                      alt="Gallery image"
                      width={300}
                      height={200}
                      className="object-cover"
                    />
                  ))}
                </div>
              );
            case 'form':
              return (
                <div key={index} className="mb-8">
                  {/* Vous pouvez rendre un formulaire ici */}
                  <p>Formulaire: {block.formId}</p>
                </div>
              );
            case 'video':
              return (
                <div key={index} className="mb-8">
                  <video controls width="100%">
                    <source src={block.videoUrl} type="video/mp4" />
                  </video>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>

      {/* Colonne droite pour l'image principale */}
      <div className="relative">
        {aboutPage.image1 && (
          <Image
            src={aboutPage.image1}
            alt={aboutPage.title}
            layout="fill" // L'image prend tout l'espace disponible
            objectFit="cover" // Ajuste l'image pour qu'elle couvre toute la zone sans déformation
            className="object-cover h-screen w-full"
          />
        )}
      </div>
    </div>
  );
};

export default AboutPage;
