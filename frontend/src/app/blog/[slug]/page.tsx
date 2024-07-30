import { PortableText } from "@portabletext/react";
import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";

const blogPost_QUERY = `*[
    _type == "blogPost" &&
    slug.current == $slug
  ][0]{
  ...,
  blogCategory->,
  blogAuthor->
}`;

const { projectId, dataset } = client.config();
export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function blogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const blogPost = await sanityFetch<SanityDocument>({
    query: blogPost_QUERY,
    params,
  });
  const {
    title,
    publishedAt,
    mainimage,
    content,
    blogCategory,
    blogAuthor,
  } = blogPost;
  const blogPostImageUrl = mainimage
    ? urlFor(mainimage)?.url()
    : null;
  const blogPostDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : null;
  const blogPostTime = publishedAt ? new Date(publishedAt).toLocaleTimeString() : null;


  return (
    <div className="grid mt-48 lg:mt-0 lg:grid-cols-2 lg:order-1">
      <div className="p-8 lg:pt-48 order-2">
        <div className="mb-4">
          <Link href="/blog">← Back to blog</Link>
        </div>
        <div className="grid items-top gap-12 pr-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              {blogCategory ? (
                <div className="inline-block rounded-md bg-dg-100 px-3 py-1 text-sm dark:bg-dg-200 capitalize">
                  {blogCategory.name}
                </div>
              ) : null}
              {title ? (
                <h1 className="text-4xl tracking-tighter mb-8">
                  {title}
                </h1>
              ) : null}
              <dl className="grid grid-cols-2 gap-1 text-sm sm:gap-2 lg:text-base">
                <dd className="">Date</dd>
                <div>
                  {blogPostDate && <dt>{blogPostDate}</dt>}
                  {blogPostTime && <dt>{blogPostTime}</dt>}
                </div>
              </dl>
              {blogAuthor?.name ? (
                <dl className="grid grid-cols-2 gap-1 text-sm sm:gap-2 lg:text-base">
                  <div className="flex items-start">
                    <dd className="">Auteur</dd>
                  </div>
                  <div className="grid gap-1">
                    <dt>{blogAuthor.name}</dt>
                  </div>
                </dl>
              ) : null}
            </div>
            {content && content.length > 0 && (
              <div className="prose max-w-none">
                <PortableText value={content} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lg:h-full rounded-md m-8 lg:m-0 bg-dg-900 overflow-hidden order-1 lg:order-2">
        <div className="lg:fixed flex justify-center items-center ">
      <Image
          src={blogPostImageUrl || "https://via.placeholder.com/900x1800"}
          alt={title || "blogPost"}
          className="object-cover lg:h-screen w-1/2 lg:w-full"
          height="600"
          width="1200"
        />
        </div>
      </div>
    </div>
  );
}