import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import {dataset, projectId} from '@/sanity/env'

const blogs_QUERY = `*[_type == "blogPost"]{
  _id,
  title,
  slug,
  thumbnail
}`;



const builder = imageUrlBuilder({ projectId, dataset })

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export default async function WorkListPage() {
  const blogs = await sanityFetch<SanityDocument[]>({
    query: blogs_QUERY,
  });

  return (
    <div className="p-8 pt-48 container mx-auto">
    <h2 className="text-4xl py-4 tracking-tighter">Blog</h2>
    <div  className="sm:columns-2 gap-8">
    <p>.</p>
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
        {blogs.map((blog) => {
          const blogImageUrl = blog.thumbnail
            ? urlFor(blog.thumbnail)?.url()
            : "https://via.placeholder.com/600x200";
          return (
            <div key={blog._id} className="overflow-hidden">
                <Link href={`/blog/${blog.slug.current}`}>
              <Image
                src={blogImageUrl}
                alt={blog.title}
                className="h-48 bg-dg-900 object-contain rounded-md"
                height="300"
                width="600"

              />
              <div className="">
                <h2 className="text-2xl mb-2">{blog.title}</h2>
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
