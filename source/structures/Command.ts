class Command {
    name: string
    description: string
    options: {
        [name: PropertyKey]: CommandOption
    } = {}
    #raw: CommandData

    constructor(data: CommandData) {
        this.name = data.name
        this.description = data.description
        this.#raw = data

        data?.options?.forEach((option) => {
            this.options[option.name] = option
        })
    }

    run(options?: { name: string; value: unknown }[], ...args: unknown[]) {
        options = options?.filter((option) => this.options?.[option.name])
        this.#raw.run(options, ...args)
    }
}

export default Command
