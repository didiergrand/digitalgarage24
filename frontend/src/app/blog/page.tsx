import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import {dataset, projectId} from '@/sanity/env'
import BlogList from "@/app/components/BlogList";

const blogs_QUERY = `*[_type == "blogPost"]| order(publishedAt desc){
  _id,
  title,
  slug,
  thumbnail,
  publishedAt
}`;

const builder = imageUrlBuilder({ projectId, dataset });

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export default async function WorkListPage() {
  const blogs = await sanityFetch<SanityDocument[]>({
    query: blogs_QUERY,
  });

  return (
    <div className="p-8 pt-48 container mx-auto">
      <h2 className="text-4xl py-4 tracking-tighter">Blog</h2>

      <BlogList blogs={blogs} />
    </div>
  );
}
