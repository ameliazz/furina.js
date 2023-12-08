interface CommandOption {
    name: string
    value?: unknown
    defaultValue?: unknown
}

interface CommandData {
    name: string
    description: string
    options?: CommandOption[]
    run: (options?: { name: string; value: unknown }[], ...args) => unknown
}
