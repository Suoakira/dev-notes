import fs from "fs"
import { join } from "path"
import matter from "gray-matter"
import { MarkdownItem } from "@/interfaces/Markdown"
import { getBlog } from "./blogs"
import html from "remark-html"
import remarkGfm from "remark-gfm"
import { remark } from "remark"

const getDir = (path: string) =>  join(process.cwd(), path)

const getFileNames = (dir: string): string [] => {
    return fs.readdirSync(dir)
}

const getItemInPath = (filePath: string): MarkdownItem => {
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)
    return { ...data, content } as MarkdownItem
}

const getAllItems = (
    fileNames: string[],
        get: (name: string) => MarkdownItem
    ) => {
    const items = fileNames.map(fileName => get(fileName))
    return items;
}

const markdownToHtml = async (markdown: string) => {
    const result = await remark()
        .use(html)
        .use(remarkGfm)
        .process(markdown)

    return result.toString();
}

export {
    getFileNames,
    getDir,
    getItemInPath,
    getAllItems,
    markdownToHtml
}