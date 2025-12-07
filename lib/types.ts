export interface TraceEntry {
  instruction: number
  step: {
    file: string
    line: number
    function: string | null
    call: boolean
  }
  children?: TraceEntry[]
}

export interface TransactionFile {
  filename: string
  txHash: string
  instructionNumber: number
  programAddress: string
  executionOrder: number
  traces: TraceEntry[]
}

export interface ProgramMeta {
  [address: string]: {
      name: string,
      path: string,
  },
}

export interface TransactionData {
  transactionFiles: TransactionFile[],
  errorData: JSON,
  mapData: ProgramMeta,
}