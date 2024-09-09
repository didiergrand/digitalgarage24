import { PortableText } from "@portabletext/react";
import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import {dataset, projectId} from '@/sanity/env'
import { ReactElement } from 'react';

const builder = imageUrlBuilder({ projectId, dataset })

const blogPost_QUERY = `*[
    _type == "blogPost" &&
    slug.current == $slug
  ][0]{
  ...,
  blogCategory->,
  blogAuthor->,
  pageBuilder[]{
    _type,
    ...,
    asset->
  }
}`;

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

const ImageComponent = ({value}: {value: any}) => {
  return (
    <Image
      src={urlFor(value).width(800).height(600).url()}
      alt={value.alt || " "}
      className="my-8 rounded-lg"
      width={800}
      height={600}
    />
  );
};

const TextWithIllustrationComponent = ({ value }: { value: any }) => {
  return (
    <div className="my-8">
      <h2>{value.heading}</h2>
      <p>{value.tagline}</p>
      <p>{value.excerpt}</p>
      {value.image && (
        <Image
          src={urlFor(value.image).width(800).height(600).url()}
          alt={value.heading || ""}
          width={800}
          height={600}
          className="my-4 rounded-lg"
        />
      )}
    </div>
  );
};

const GalleryComponent = ({ value }: { value: any }) => {
  // Implémentez le rendu de la galerie ici
};

const VideoComponent = ({ value }: { value: any }) => {
  // Implémentez le rendu de la vidéo ici
};

const RichTextComponent = ({ value }: { value: any }) => {
  return (
    <div className="prose max-w-none">
      <PortableText value={value.content} />
    </div>
  );
};

const TableComponent = ({ value }: { value: any }) => {
  return (
    <table className="table-auto border-collapse border border-gray-400 my-4">
      <tbody>
        {value.rows.map((row: any, rowIndex: number) => (
          <tr key={rowIndex}>
            {row.cells.map((cell: string, cellIndex: number) => (
              <td key={cellIndex} className="border border-gray-400 px-4 py-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

type ComponentType = ({ value }: { value: any }) => ReactElement | null;

const PortableTextComponents: { types: { [key: string]: ComponentType } } = {
  types: {
    image: ImageComponent,
    textWithIllustration: TextWithIllustrationComponent,
    gallery: GalleryComponent,
    video: VideoComponent,
    richText: RichTextComponent,
    table: TableComponent,
  },
};

type BlockType = {
  _type: keyof typeof PortableTextComponents['types'];
  [key: string]: any;
};

type BlogPost = SanityDocument & {
  title?: string;
  publishedAt?: string;
  mainimage?: SanityImageSource;
  pageBuilder?: BlockType[];
  blogCategory?: { name: string };
  blogAuthor?: { name: string };
};

export default async function blogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const blogPost = await sanityFetch<BlogPost>({
    query: blogPost_QUERY,
    params,
  });
  const {
    title,
    publishedAt,
    mainimage,
    pageBuilder,
    blogCategory,
    blogAuthor,
  } = blogPost;
  const blogPostImageUrl: string = mainimage
      ? urlFor(mainimage)?.url() ?? "https://via.placeholder.com/900x1800"
      : "https://via.placeholder.com/900x1800";
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
            {pageBuilder && pageBuilder.length > 0 && (
              <div className="prose max-w-none">
                {pageBuilder.map((block: BlockType, index: number) => {
                  const Component = PortableTextComponents.types[block._type] as ComponentType;
                  return Component ? <Component key={index} value={block} /> : null;
                })}
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