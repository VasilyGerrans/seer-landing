import { ProgramMeta, TraceEntry, TransactionData, TransactionFile } from "@/lib/types"
import { useEffect, useState } from "react"
import { ArrowLeft, Loader2, Search, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { TraceEntryComponent } from "./trace-entry"

interface TracerInstruction {
    instructionNumber: number,
    traces: Array<{
        entry: TraceEntry,
        progamId: string,
        isFirstInProgram: boolean,
    }>
}

interface TracerViewProps {
    hash: string,
}

export default function TracerView({ hash }: TracerViewProps) {
    const [loading, setLoading] = useState(true)
    const [searchHash, setSearchHash] = useState(hash)
    const [errorData, setErrorData] = useState<any>(null)
    const [isStateDumpOpen, setIsStateDumpOpen] = useState(false)
    const [transactionFiles, setTransactionFiles] = useState<TransactionFile[]>([]);
    const [mapData, setMapData] = useState<ProgramMeta>({});

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                setLoading(true)
                const response = await fetch(`/api/transaction/${hash}`);
                const data: TransactionData = await response.json();

                setTransactionFiles(data.transactionFiles);
                setErrorData(data.errorData || null);
                setMapData(data.mapData);
            } catch (error) {
                console.error("[v0] Error fetching transaction:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchTransaction();
    }, [hash])

    const groupedInstructions: TracerInstruction[] = transactionFiles.reduce((acc, file) => {
        const existingInstruction = acc.find((group) => group.instructionNumber === file.instructionNumber)

        const displayName = mapData[file.programAddress].name || file.programAddress

        const tracesWithMetadata = file.traces.map((trace, index) => ({
            entry: trace,
            isFirstInProgram: index === 0,
            progamId: displayName,
        }));

        if (existingInstruction) {
            existingInstruction.traces.push(...tracesWithMetadata)
        } else {
            acc.push({
                instructionNumber: file.instructionNumber,
                traces: tracesWithMetadata,
            })
        }

        return acc
    }, [] as TracerInstruction[])

    groupedInstructions.sort((a, b) => a.instructionNumber - b.instructionNumber)

    return (
        <div className="dark min-h-screen flex flex-col">
            <header className="border-b border-border bg-card sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button size="sm" className="gap-2 bg-accent hover:bg-accent">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                        <h1 className="text-xl font-mono font-semibold">Seer Transaction Trace</h1>
                    </div>
                    <form className="mt-4">
                        <div className="relative max-w-2xl">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Search another transaction..."
                                value={searchHash}
                                onChange={(e) => setSearchHash(e.target.value)}
                                className="pl-10 font-mono bg-secondary border-border"
                            />
                        </div>
                    </form>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : groupedInstructions.length === 0 ? (
                    <div className="text-center py-20 space-y-4">
                        <div className="text-6xl">🔍</div>
                        <h2 className="text-2xl">No Transaction Found</h2>
                        <p className="">
                            No trace files found for transaction hash: <span className="font-mono">{hash}</span>
                        </p>
                        <p className="text-sm">
                            Make sure the transaction has been traced and the files are in the seer folder.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="space-y-6">
                            {groupedInstructions.map((instruction, index) => (
                                <div key={index} className="border border-border rounded-lg overflow-hidden bg-card">
                                    <div className="bg-secondary px-4 py-3 border-b border-border">
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs">Instruction</span>
                                                <span className="font-mono font-semibold">{instruction.instructionNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        {instruction.traces.map((trace, traceIndex) => (
                                            <TraceEntryComponent
                                                key={traceIndex}
                                                entry={trace.entry}
                                                depth={0}
                                                isFirstInProgram={trace.isFirstInProgram}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {errorData && (
                                <div className="border border-border rounded-lg overflow-hidden bg-card">
                                    <div
                                        className="bg-secondary px-4 py-3 border-b border-border cursor-pointer hover:bg-secondary/80 transition-colors"
                                        onClick={() => setIsStateDumpOpen(!isStateDumpOpen)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {isStateDumpOpen ? (
                                                <ChevronDown className="h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4" />
                                            )}
                                            <span className="font-mono font-semibold">Local Variable Dump</span>
                                        </div>
                                    </div>
                                    {isStateDumpOpen && (
                                        <pre className="p-3 text-xs leading-relaxed font-mono overflow-x-auto whitespace-pre">
                                            {JSON.stringify(errorData, null, 2).replace(/\[\s+([^]+?)\s+\]/g, (m, inner) => `[${inner.replace(/\s+/g, ' ')}]`)}
                                        </pre>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}