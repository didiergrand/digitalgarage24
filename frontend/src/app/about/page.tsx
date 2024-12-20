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

const getAboutPage = async (): Promise<AboutPageType | null> => {
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
  return aboutPage as AboutPageType | null;
}


const AboutPage = async () => {
  const aboutPage = await getAboutPage();

  if (!aboutPage) {
    return <div>Page content not found.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[100vh] container mx-auto pt-48 pb-12">
      {/* Colonne gauche pour le texte et autre contenu */}
      <div className="p-8">
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
            default:
              return null;
          }
        })}
      </div>

      {/* Colonne droite pour l'image principale */}
      <div className="relative hidden sm:block">
        {aboutPage.image1 && (
          <Image
            src={aboutPage.image1}
            alt={aboutPage.title}            
            fill
            style={{ objectFit: "cover" }}
            className="object-cover h-screen w-full"
          />
        )}
      </div>
    </div>
  );
};

export default AboutPage;
