import { type NextRequest, NextResponse } from "next/server"
import { readdir, readFile } from "fs/promises"
import { join } from "path"
import type { TransactionFile, TraceEntry, ProgramMeta, TransactionData } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: Promise<{ hash: string }> }) {
  try {
    const { hash } = await params
    const projectRoot = process.env.PROJECT_ROOT || process.cwd()
    const seerPath = join(projectRoot, "seer")

    let files: string[]
    try {
      files = await readdir(seerPath)
    } catch (error) {
      console.log("[v0] Seer directory not found:", error)
      return NextResponse.json({ files: [] })
    }

    const matchingFiles = files.filter((file) => file.startsWith(hash) && file.endsWith(".json"))

    if (matchingFiles.length === 0) {
      return NextResponse.json({ files: [] })
    }

    const errorFiles = matchingFiles.filter((file) => file.includes("_error.json"))
    let errorData = null

    if (errorFiles.length > 0) {
      const errorFilePath = join(seerPath, errorFiles[0])
      const errorContent = await readFile(errorFilePath, "utf-8")
      errorData = JSON.parse(errorContent)
    }

    const transactionFiles: TransactionFile[] = []

    const metaPath = join(projectRoot, "meta.json");
    const metaContent = await readFile(metaPath, "utf-8");
    const meta: ProgramMeta = JSON.parse(metaContent);

    for (const filename of matchingFiles) {
      if (filename.includes("_error.json")) continue

      const parts = filename.replace(".json", "").split("_")
      if (parts.length < 4) continue

      const txHash = parts[0]
      const instructionNumber = Number.parseInt(parts[1], 10)
      const executionOrder = Number.parseInt(parts[parts.length - 1], 10)
      const programAddress = parts.slice(2, -1).join("_")

      const filePath = join(seerPath, filename)
      const fileContent = await readFile(filePath, "utf-8")
      const traces: TraceEntry[] = JSON.parse(fileContent)

      transactionFiles.push({
        filename,
        txHash,
        instructionNumber,
        programAddress,
        executionOrder,
        traces,
      })
    }

    transactionFiles.sort((a, b) => a.executionOrder - b.executionOrder);

    const response: TransactionData = {
        transactionFiles,
        errorData: errorData,
        mapData: meta,
    };

    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] Error reading transaction files:", error)
    return NextResponse.json({ error: "Failed to read transaction files" }, { status: 500 })
  }
}
