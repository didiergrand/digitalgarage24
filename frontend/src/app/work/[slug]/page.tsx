import { PortableText } from "@portabletext/react";
import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import {dataset, projectId} from '@/sanity/env'
import Image from "next/image";

const workPost_QUERY = `*[
    _type == "workPost" &&
    slug.current == $slug
  ][0]{
  ...,
  workCategory->,
  workAuthor->
}`;

const builder = imageUrlBuilder({ projectId, dataset })

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}


export default async function workPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const workPost = await sanityFetch<SanityDocument>({
    query: workPost_QUERY,
    params,
  });
  const {
    title,
    publishedAt,
    mainimage,
    content,
    workCategory,
    workAuthor,
  } = workPost;
  const workPostImageUrl = mainimage
    ? urlFor(mainimage)?.url()
    : null;
  const workPostDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : null;
  const workPostTime = publishedAt ? new Date(publishedAt).toLocaleTimeString() : null;


  return (
    <div className="grid sm:grid-cols-2">
      <div className="p-8 pt-48">
        <div className="mb-4">
          <Link href="/work">← Back to work</Link>
        </div>
        <div className="grid items-top gap-12 pr-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              {workCategory ? (
                <div className="inline-block rounded-md bg-dg-100 px-3 py-1 text-sm dark:bg-dg-200 capitalize">
                  {workCategory.name}
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
                  {workPostDate && <dt>{workPostDate}</dt>}
                  {workPostTime && <dt>{workPostTime}</dt>}
                </div>
              </dl>
              {workAuthor?.name ? (
                <dl className="grid grid-cols-2 gap-1 text-sm sm:gap-2 lg:text-base">
                  <div className="flex items-start">
                    <dd className="">Auteur</dd>
                  </div>
                  <div className="grid gap-1">
                    <dt>{workAuthor.name}</dt>
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
        <div>
        <Image
            src={workPostImageUrl || "https://via.placeholder.com/900x1800"}
            alt={title || "workPost"}
            className="mx-auto overflow-hidden object-cover object-center sm:w-full"
            width={900}
            height={1800}
          />
        </div>
    </div>
  );
}