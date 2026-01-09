import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface Article {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  author: string
  readTime: string
  featured?: boolean
  content: string
}

const postsDirectory = path.join(process.cwd(), "posts")

// 1. 获取所有文章 (给博客列表页用)
export function getAllArticles(): Article[] {
  // 如果没有 posts 文件夹，返回空数组，防止报错
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  
  const allArticles = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as any),
    } as Article
  })

  // 按日期排序
  return allArticles.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// 2. 获取单篇文章 (给详情页用)
export function getArticleBySlug(slug: string): Article | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as any),
    } as Article
  } catch (error) {
    return undefined
  }
}