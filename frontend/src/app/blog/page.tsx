import Link from "next/link";
import { SanityDocument } from "next-sanity";

import { sanityFetch } from "@/sanity/client";

const blogPostS_QUERY = `*[_type == "blogPost"]{_id, title, slug, publishedAt}|order(publishedAt desc)`;

export default async function IndexPage() {
  const blogPosts = await sanityFetch<SanityDocument[]>({query: blogPostS_QUERY});

  return (
    <div className="grid grid-cols-2">
      <div className="p-8 pt-48">
      <h1 className="text-4xl tracking-tighter">
        Blog
      </h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {blogPosts.map((blogPost) => (
          <li
            className="bg-white p-4 rounded-lg"
            key={blogPost._id}
          >
          <img src={blogPost.image} alt={blogPost.title} className="object-cover h-screen w-full" />
            <Link
              className="hover:underline"
              href={`/blog/${blogPost.slug.current}`}
            >
              <h2 className="text-xl">{blogPost?.title}</h2>
              <p className="text-dg-500">
                {new Date(blogPost?.publishedAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      </div>
        <div>
        {blogPosts.map((item) => (
            <img src={item.image} alt={item.title} className="object-cover h-screen w-full" />
          ))}
        </div>
    </div>
  );
}


