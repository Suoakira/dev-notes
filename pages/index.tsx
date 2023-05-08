import type { GetStaticProps, NextPage } from 'next'
import Link from "next/link";
import { getBlogs } from "../lib/blogs"
import { BlogList, PortfolioList, LayoutBase } from "../components/index"
import { Blog } from '@/interfaces/Blog';

type Props = {
  blogs: Blog[]
}

const Home: NextPage<Props> = ({ blogs }) => {
  return (
    <LayoutBase>
      <h2 
        className="text-2xl font-bold tracking-tight text-gray-900">
          Newest Blogs
          <Link legacyBehavior href="/blogs">
            <a className='text-sm ml-1 text-indigo-600'>
              ( See All )
            </a>
          </Link>
      </h2>
      <BlogList blogs={blogs} />
      <br></br>
      <h2 
        className="text-2xl font-bold tracking-tight text-gray-900">
          Portfolios
          <Link legacyBehavior href="/portfolios">
            <a className='text-sm ml-1 text-indigo-600'>
              ( See All )
            </a>
          </Link>
      </h2>
      <PortfolioList />
    </LayoutBase>
  )
}

export const getStaticProps: GetStaticProps = () => {

  const blogs = getBlogs();
  console.log(blogs)
  return {
      props: { blogs }
  }
}

export default Home