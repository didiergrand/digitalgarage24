import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Metadata } from 'next'

import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import {dataset, projectId} from '@/sanity/env'
import BlogList from "@/app/components/BlogList";

const blogs_QUERY = `*[_type == "blogPost" && blogCategory->name != "Photo"]| order(publishedAt desc){
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

export const metadata: Metadata = {
  title: 'Blog - Digitalgarage – Didier Grand',
  description: 'Découvrez mes articles sur le développement web, le design et la gestion de projet...',
}

export default async function WorkListPage() {
  const blogs = await sanityFetch<SanityDocument[]>({
    query: blogs_QUERY,
  });

  return (
    <div className="blog-post p-8 pt-48 container mx-auto">
      <h2>Blog.</h2>

      <BlogList blogs={blogs} />
    </div>
  );
}
