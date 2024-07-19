import { sanityFetch } from "@/sanity/client";


async function getAboutPage() {
  const query = `*[_type == "page" && slug.current == "about"][0]`;
  const aboutPage = await sanityFetch({ query });
  return aboutPage;
}

const AboutPage = async () => {
  const aboutPage: any = await getAboutPage();

  if (!aboutPage) {
    return <div>Page content not found.</div>;
  }
  return (
    <div className="grid grid-cols-2">
      <div className="p-8 pt-48">
        <div>
          <h1 className="text-4xl tracking-tighter mb-8 uppercase">{aboutPage.title}</h1>
          {aboutPage.pageBuilder.map((item: any, index: number) => (
            <p key={index} className="text-lg text-dg-600">{item.excerpt}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;