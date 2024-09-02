import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";

const navigation_QUERY = `*[_type == "navigation"]{
  _id,
  title, 
  links[]->{
    _id,
    linkName,
    linkUrl,
  }, 
  "image": image.asset->url
}`;

export default async function IndexPage() {
  const navigations = await sanityFetch<SanityDocument[]>({query: navigation_QUERY});

  return (
    <div className="grid grid-cols-2">

    {/* Colonne droite pour les images */}
    <div>
      {navigations.map((item) => (
        <Image 
          key={item._id} 
          src={item.image} 
          alt={item.title} 
          width={715} 
          height={1024} 
          className="object-cover h-screen w-full" 
        />
      ))}
    </div>
      {/* Colonne gauche pour les éléments de navigation */}
      <div className="bg-dg-900 p-8 pt-48">
        {navigations.map((navItem) => (
          <ul key={navItem._id}>
            {navItem.links.map((link: any) => (
              <li key={link._id} className="border-b last:border-none border-b-dg-500">
                <Link 
                  className="text-3xl flex h-24 text-dg-500 transition-colors ease-in-out duration-300 items-center hover:text-white" 
                  href={link.linkUrl || "#"}
                >
                  {link.linkName}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
