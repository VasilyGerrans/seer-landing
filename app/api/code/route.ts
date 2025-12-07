import { type NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { getHighlighter, getLanguageFromExtension } from "@/lib/shiki"
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    const projectRoot = process.env.PROJECT_ROOT || process.cwd()

    const searchParams = request.nextUrl.searchParams;
    let filename = searchParams.get("file");
    
    if (!filename) {
      return NextResponse.json({ error: "File path is required" }, { status: 400 })
    }

    const filePath = join(projectRoot, filename);
    const lineNumber = Number.parseInt(searchParams.get("line") || "0", 10);

    const fileContent = await readFile(filePath, "utf-8")
    const lines = fileContent.split("\n")

    const startLine = Math.max(0, lineNumber - 6)
    const endLine = Math.min(lines.length, lineNumber + 5)

    const codeLines = lines.slice(startLine, endLine)
    const code = codeLines.join("\n")

    const extension = filePath.split(".").pop() || "txt"
    const language = getLanguageFromExtension(extension)

    const highlighter = await getHighlighter()
    const html = highlighter.codeToHtml(code, {
      lang: language,
      theme: "aurora-x",
    })

    return NextResponse.json({
      html,
      startLine: startLine + 1,
      targetLine: lineNumber,
      extension,
      language,
      totalLines: lines.length,
    })
  } catch (error) {
    console.error("[v0] Error reading code file:", error)
    return NextResponse.json({ error: "Failed to read code file" }, { status: 500 })
  }
}
