import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";

const works_QUERY = `*[_type == "workPost"]{
  _id,
  title,
  slug,
  thumbnail
}`;

const { projectId, dataset } = client.config();
export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function WorkListPage() {
  const works = await sanityFetch<SanityDocument[]>({
    query: works_QUERY,
  });

  return (
    <div className="p-8 pt-48 container mx-auto">
    <h2 className="text-4xl py-4 tracking-tighter">Réalisation de sites web</h2>
    <div  className="columns-2 gap-8">
    <p>Je suis développeur front-end chez Scott Sports à Givisiez depuis plus de 10ans. Ma dernière réalisation en tant que développeur front-end chez Scott a été la développement de la nouvelle navigation du site scott-sports.com. Elle se distingue par sa conception intelligente, notamment pour les affichages sur petits écrans, où elle repose sur le même code HTML et JavaScript, les changements n’interviennent que sur le CSS. Cette approche est particulièrement judicieuse, car elle permet de réduire le nombre de lignes de code, simplifiant ainsi le développement sans compromettre les fonctionnalités. Vous pouvez la découvrir sur scott-sports.com, ainsi que sur les autres sites du groupe Scott, comme celui de Dolomite ou Syncros.<br/>En parallèle de mon travail de développeur front-end chez Scott, je suis une formation de Digital Project Manager au SAWI en vue de l'obtention du diplome fédéral de Web Project Manager. C’est un challenge vraiment motivant qui me demande beaucoup de temps et d’énergie qui va me permettre de relever de nouveaux chalenges dans le futur. Cette formation m'apporte beaucoup d'un point de vue personnel car j'adore aquérir de nouvelles compétences, mes collègues de cours m'apportent également beaucoup par leur expérience très enrichissante.</p></div>
    <h3 className="text-3xl py-4 pt-16 tracking-tighter">Ils me font confiance pour leur site web</h3>
    <div className="columns-2 gap-8">
    <p>J’ai le privilège de collaborer avec plusieurs communes de la Veveyse, des organisations à but non lucratif et diverses entreprises, chacune avec ses défis uniques et des visions distinctes. Je les accompagne également dans la maintenance de leur site web, garantissant ainsi une présence en ligne sécurisée et à jour. De nombreux autres clients m’ont également fait confiance pour renforcer leur présence en ligne et valoriser leur expertise.<br/>Chaque réalisation est le reflet d’une belle collaboration et je suis fier de les mettre en avant ici.</p>
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
        {works.map((work) => {
          const workImageUrl = work.thumbnail
            ? urlFor(work.thumbnail)?.url()
            : "https://via.placeholder.com/600x200";
          return (
            <div key={work._id} className="overflow-hidden">
                <Link href={`/work/${work.slug.current}`}>
              <Image
                src={workImageUrl}
                alt={work.title}
                className="h-48 p-4 object-contain bg-white rounded-md"
                height="300"
                width="600"

              />
              <div className="p-4">
                <h2 className="text-2xl mb-2">{work.title}</h2>
                  Lire plus
              </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
