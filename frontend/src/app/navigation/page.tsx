import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import Link from "next/link";


const navigation_QUERY = `*[_type == "navigation"]{_id, title, 
  links[]->{
    linkName,
    linkUrl,
  }, "image": image.asset->url}`;

export default async function IndexPage() {
  const navigations = await sanityFetch<SanityDocument[]>({query: navigation_QUERY});

  return (
    <div className="grid grid-cols-2">
      <div className=" bg-dg-900 p-8 pt-48">
        {navigations.map((navItem) => (
            <ul>
              {navItem.links.map((link:any,index:number) => (
                <li key={link._id}>
                  <Link href={link.linkUrl || "#"}>
                    {link.linkName}
                  </Link>
                </li>
              ))}
            </ul>
        ))}
      </div>
      <div>
        {navigations.map((item) => (
            <img src={item.image} alt={item.title} className="object-cover h-screen w-full" />
          ))}
      </div>
    </div>
  );
}






