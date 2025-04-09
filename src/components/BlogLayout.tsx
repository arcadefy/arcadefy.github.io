// components/layout.tsx
import { ReactNode } from "react";
import { NextSeo } from 'next-seo';
import config from '../../config';


interface LayoutProps {
  title?: string;
  slug?: string;
  description?: string;
  children: ReactNode;
}

export default function Layout({ title = 'Page has no title', slug = '', description = 'Page has no description', children }: LayoutProps) {

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={config.siteURL + slug}

      />
      <div className="mx-auto border-x prose prose-md container  max-w-7xl">

        <article className=" p-5   bg-white">
          <h1 className="md:text-3xl  p-5  flex justify-center  text-2xl">{title}</h1>
          {children}

        </article>


      </div>
    </>
  );
}
