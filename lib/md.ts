import fs from "fs"
import { join } from "path"


const getDir = (path: string) =>  join(process.cwd(), path)
const BLOG_DIR = getDir("/content/blogs")

const getFileNames = (dir: string): string [] => {
    return fs.readdirSync(dir)
}

const getBlogFileNames = () => {
    return getFileNames(BLOG_DIR)
}

const getBlog = (fileName: string) => {
    const blog = getItemInPath(join(BLOG_DIR, fileName))
    return blog
}

const getItemInPath = (filePath: string) => {
    const fileContent = fs.readFileSync(filePath, "utf8")
    return fileContent
}

export {
    getFileNames,
    getDir,
    getItemInPath,
    BLOG_DIR,
    getBlogFileNames,
    getBlog
}