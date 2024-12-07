// components/BlogList.tsx

import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from '@/sanity/env';

const builder = imageUrlBuilder({ projectId, dataset });

function urlFor(source: any) {
  return builder.image(source);
}

interface BlogListProps {
  blogs: SanityDocument[];
}

export default function BlogList({ blogs }: BlogListProps) {
  return (
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
                className="h-48 bg-dg-950 object-contain rounded-md"
                height="300"
                width="600"
              />
              <div className="">
                <h2 className="text-2xl mb-2">{blog.title}</h2>
                En savoir plus
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
