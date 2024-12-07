import { PortableText } from "@portabletext/react";
import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import {dataset, projectId} from '@/sanity/env'
import { ReactElement } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect } from 'react';

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
    asset{
      ...,
      metadata
    },
    // Pour les blocs de code
    language,
    code,
    filename
  }
}`;

function urlFor(source: SanityImageSource | null | undefined) {
  return source ? builder.image(source) : null;
}

const ImageComponent = ({value}: {value: any}): ReactElement => {
  // Vérifiez si value est un objet d'image valide ou s'il contient une propriété image
  const imageSource = value.asset ? value : value.image;

  if (!imageSource) {
    console.error('Invalid image data:', value);
    // Retournons un élément div vide au lieu de null
    return <div className="my-4 rounded-lg w-full h-auto"></div>;
  }

  const imageUrl = urlFor(imageSource)?.url();
  if (!imageUrl) {
    console.error('Unable to resolve image URL');
    return <div className="my-4 rounded-lg w-full h-auto"></div>;
  }

  return (
    <Image
      src={imageUrl}
      alt={value.alt || value.heading || ""}
      width={imageSource.metadata?.dimensions?.width || 1600}
      height={imageSource.metadata?.dimensions?.height || 1200}
      className="my-4 rounded-lg h-auto max-h-[1600px] w-auto m-auto"
    />
  );
};

const TextWithIllustrationComponent = ({ value }: { value: any }): ReactElement => {
  const imageUrl = value.image ? urlFor(value.image)?.url() : null;

  return (
    <div className="my-8">
      <h2>{value.heading}</h2>
      <p>{value.tagline}</p>
      <p>{value.excerpt}</p>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={value.heading || ""}
          width={800}
          height={600}
          className="my-4 rounded-lg"
        />
      )}
    </div>
  );
};

const GalleryComponent = ({ value }: { value: any }): ReactElement | null => {
  // Implémentez le rendu de la galerie ici
  return null;
};

const VideoComponent = ({ value }: { value: any }): ReactElement | null => {
  // Implémentez le rendu de la vidéo ici
  return null;
};

const RichTextComponent = ({ value }: { value: any }): ReactElement => {
  return (
    <div className="prose max-w-none">
      <PortableText value={value.content} />
    </div>
  );
};

const TableComponent = ({ value }: { value: any }): ReactElement => {
  return (
    <table className="table-auto border-collapse border border-gray-400 my-4 w-full">
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

const CodeComponent = ({ value }: { value: any }): ReactElement => {
  return (
    <div className="my-4">
      {value.filename && <p className="text-sm text-gray-500 mb-2">{value.filename}</p>}
      <SyntaxHighlighter 
        language={value.language || 'javascript'} 
        style={tomorrow}
        customStyle={{
          borderRadius: '0.375rem',
          padding: '1rem',
        }}
      >
        {value.code || '// No code provided'}
      </SyntaxHighlighter>
    </div>
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
    codeBlock: CodeComponent, 
  },
};

type BlockType = {
  _type: 'richText' | 'codeBlock' | 'image' | 'textWithIllustration' | 'gallery' | 'video' | 'table';
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
    ? urlFor(mainimage)?.url() || "https://via.placeholder.com/900x1800"
    : "https://via.placeholder.com/900x1800";
  const blogPostDate = publishedAt ? new Date(publishedAt).toLocaleDateString('fr-FR') : null;

  return (
    <div className="blog-post lg:mt-0">

<div className="mt-48 rounded-md bg-dg-950 overflow-hidden h-96 container m-auto flex justify-center items-center relative">
          <Image
            src={blogPostImageUrl || "https://via.placeholder.com/900x1800"}
            alt={title || "blogPost"}
            className="h-[120%] w-auto absolute"
            height={600}
            width={1200}
          />
        </div>
      <div className="p-8 max-w-4xl m-auto">
        <div className="mb-4">
          <Link href="/blog">← Retour au blog</Link>
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
    </div>
  );
}