// components/GalleryList.tsx

import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from '@/sanity/env';

const builder = imageUrlBuilder({ projectId, dataset });

function urlFor(source: any) {
  return builder.image(source);
}

interface GalleryListProps {
  galleries: SanityDocument[];
}

export default function GalleryList({ galleries }: GalleryListProps) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
      {galleries.map((gallery) => {
        const galleryImageUrl = gallery.thumbnail
          ? urlFor(gallery.thumbnail)?.url()
          : "https://via.placeholder.com/600x200";
        return (
          <div key={gallery._id} className="overflow-hidden">
            <Link href={`/gallery/${gallery.slug.current}`}>
              <Image
                src={galleryImageUrl}
                alt={gallery.title}
                className="h-48 bg-dg-900 object-cover rounded-md"
                height="300"
                width="600"
              />
              <div className="">
                <h2 className="text-2xl mb-2">{gallery.title}</h2>
                Voir la galerie
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
