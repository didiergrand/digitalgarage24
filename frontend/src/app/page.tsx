import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import ProgressBar from "./components/ProgressBar"; // Adjust the path as necessary
import RotatingText from "./components/RotatingText"; // Adjust the path as necessary
import Image from "next/image";


const homepage_QUERY = `*[_type == "homepage"]{_id, title1, title2, title3, line1, line2, line3, slogan1, slogan2, slogan3, "image": image1.asset->url}`;

export default async function IndexPage() {
  const homepages = await sanityFetch<SanityDocument[]>({ query: homepage_QUERY });

  return (
    <div className="grid lg:grid-cols-2">
      <div className="p-8 pt-48 flex items-center">
        {homepages.map((homepage) => (
          <div key={homepage._id} className="homepage">
            <div className="intro"><h2>{homepage?.title1}</h2>
            <ProgressBar value={homepage?.line1} line="line1" /></div><br/>
            <div className="intro"><h2>{homepage?.title2}</h2>
            <ProgressBar value={homepage?.line2} line="line2" /></div><br/>
            <div className="intro"><h2>{homepage?.title3}</h2>
            <ProgressBar value={homepage?.line3} line="line3"  /></div>

            <RotatingText quote1={homepage?.slogan1} quote2={homepage?.slogan2} quote3={homepage?.slogan3} />
          </div>
        ))}
      </div>
      <div>
        {homepages.map((homepage) => (
          <Image
            key={homepage._id}
            src={homepage.image}
            alt={homepage.title}
            className="object-cover h-screen w-full"
            height="300"
            width="600"
          />
        ))}
      </div>
    </div>
  );
}
