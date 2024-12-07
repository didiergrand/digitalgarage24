import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import { PortableText } from '@portabletext/react'
import {dataset, projectId} from '@/sanity/env'
import Image from "next/image";

const work_QUERY = `*[_type == "work"] | order(title asc) {
  _id,
  title,
  content,
}`;
const works_QUERY = `*[_type == "workPost"]{
  _id,
  title,
  url,
  slug,
  thumbnail
}`;

const builder = imageUrlBuilder({ projectId, dataset })

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}


export default async function WorkListPage() {
  const work = await sanityFetch<SanityDocument[]>({
    query: work_QUERY,
  });
  const works = await sanityFetch<SanityDocument[]>({
    query: works_QUERY,
  });

  return (
    <div className="py-8 pt-48 container mx-auto">

    {work.map((workItem: any, index: number) => {
          return (
            <div className="p-8">
              <h2 className="text-4xl py-4 mb-4 tracking-tighter">{workItem.title}</h2>
              <div className="sm:columns-2 gap-8 mb-14">
                <PortableText value={workItem.content} />
              </div>
            </div>
          )
    })}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
        {works.map((work) => {
          const workImageUrl = work.thumbnail
            ? urlFor(work.thumbnail)?.url()
            : "https://via.placeholder.com/600x200";
          return (
            <div key={work._id} className="overflow-hidden">
                <a href={work.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={workImageUrl}
                alt={work.title}
                width={715} 
                height={1024} 
                className="h-48 p-4 object-contain bg-white rounded-md"
              />
              <div className="">
                <h2 className="text-2xl mb-2">{work.title}</h2>
                  Visitez le site
              </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
