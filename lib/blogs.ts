import { join } from "path"
import { Blog } from "@/interfaces/Blog"
import { getAllItems, getDir, getFileNames, getItemInPath, markdownToHtml } from "./md"

const BLOG_DIR = getDir("/content/blogs")

const getBlogFileNames = () => {
    return getFileNames(BLOG_DIR)
}

const getBlogBySlug = (slug: string) => {
    const fileName = slug + ".md";
    return getBlog(fileName);
}

const getBlogsSlugs = () => {
    return getBlogFileNames().map(fileName => fileName.replace(/\.md$/, ""))
}

const getBlogBySlugWithMd = async (slug: string): Promise<Blog> => {
    const blog = getBlogBySlug(slug);
    blog.content = await markdownToHtml(blog.content);
    return blog;
}

const getBlog = (fileName: string): Blog => {
    const blog = getItemInPath(join(BLOG_DIR, fileName)) as Blog
    blog.slug = fileName.replace(/\.md$/, "");
    return blog
}

const getBlogs = (): Blog[] => {
    const names = getBlogFileNames();
    return getAllItems(names, getBlog) as Blog[];
}

export {
    BLOG_DIR,
    getBlogFileNames,
    getBlog,
    getBlogs,
    getBlogsSlugs,
    getBlogBySlug,
    getBlogBySlugWithMd
}