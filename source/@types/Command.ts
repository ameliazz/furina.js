import type Furina from '@/index.js'

export interface CommandOption {
    name: string
    value?: unknown
    defaultValue?: unknown
}

export interface RunData {
    options?: CommandOption[]
    args: string[]
    manager: Furina
}

export interface CommandData {
    name: string
    description: string
    options?: CommandOption[]
    run: (data: RunData) => unknown
}
