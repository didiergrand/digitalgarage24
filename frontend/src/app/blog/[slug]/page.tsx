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
    image,
    content,
    blogCategory,
    blogAuthor,
  } = blogPost;
  const blogPostImageUrl = image
    ? urlFor(image)?.width(550).height(310).url()
    : null;
  const blogPostDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : null;
  const blogPostTime = publishedAt ? new Date(publishedAt).toLocaleTimeString() : null;


  return (
    <div className="grid grid-cols-2">
      <div className="p-8 pt-48">
        <div className="mb-4">
          <Link href="/blog">← Back to Blog</Link>
        </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              {blogCategory ? (
                <div className="inline-block rounded-lg bg-dg-100 px-3 py-1 text-sm dark:bg-dg-800 capitalize">
                  {blogCategory.name}
                </div>
              ) : null}
              {title ? (
                <h1 className="text-4xl tracking-tighter mb-8">
                  {title}
                </h1>
              ) : null}
              <dl className="grid grid-cols-2 gap-1 text-sm sm:gap-2 lg:text-base">
                <dd>Date</dd>
                <div>
                  {blogPostDate && <dt>{blogPostDate}</dt>}
                  {blogPostTime && <dt>{blogPostTime}</dt>}
                </div>
              </dl>
              {blogAuthor?.name ? (
                <dl className="grid grid-cols-2 gap-1 text-sm sm:gap-2 lg:text-base">
                  <div className="flex items-start">
                    <dd>Auteur</dd>
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
      <div>
      <Image
          src={blogPostImageUrl || "https://via.placeholder.com/550x310"}
          alt={title || "workPost"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="310"
          width="550"
        />
      </div>
    </div>
  );
}