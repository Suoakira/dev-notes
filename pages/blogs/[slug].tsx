import {  GetStaticPaths, GetStaticProps, NextPage } from 'next/types'
import Image from "next/image";
import LayoutPage from '../../components/common/layoutPage';
import { getBlogBySlug, getBlogBySlugWithMd, getBlogsSlugs } from '@/lib/blogs';
import { Blog } from '@/interfaces/Blog';
import { ParsedUrlQuery } from 'querystring';
import BlogHeader from '@/components/common/blogHeader';

type Props = {
  blog: Blog
}

const BlogDetail: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <LayoutPage pageTitle={blog.title} >
        <div className="w-2/3 m-auto">
          <BlogHeader blog={blog} />
          <article className="prose lg:prose-lg markdown-image-50">
            <div dangerouslySetInnerHTML={{  __html: blog.content }} />
          </article>
        </div>
      </LayoutPage>
    </>
  )
}


interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ( context ) => {
  const { slug } = context.params!;
  const blog = await getBlogBySlugWithMd(slug);

  return {
    props: { blog }
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getBlogsSlugs();
  const paths = slugs.map(slug => ({params: {slug}}));

  console.log(paths)

  return {
    paths,
    fallback: false
  }
}

export default BlogDetail;