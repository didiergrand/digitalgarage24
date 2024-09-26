import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import {dataset, projectId} from '@/sanity/env'
import GalleryList from "@/app/components/GalleryList";

const photos_QUERY = `*[_type == "blogPost" && blogCategory->name == "Photo"] | order(publishedAt desc){
  _id,
  title,
  slug,
  thumbnail,
  publishedAt
}`;

const categories_QUERY = `*[_type == "blogCategory"] {
  _id,
  name
}`;

const builder = imageUrlBuilder({ projectId, dataset });

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface GalleryListProps {
    blogs: SanityDocument[];
    type: string; // {{ edit_1 }} Add this line to include the 'type' property
}

export default async function WorkListPage() {
  const blogs = await sanityFetch<SanityDocument[]>({
    query: photos_QUERY,
  });

  const categories = await sanityFetch<SanityDocument[]>({
    query: categories_QUERY,
  });

  console.log(categories); // Affiche les catégories dans la console

  const type = "gallery"; // Define the gallery variable

  return (
    <div className="p-8 pt-48 container mx-auto">
      <h2 className="text-4xl py-4 tracking-tighter">Galeries photo</h2>
      <GalleryList galleries={blogs} />
    </div>
  );
}
