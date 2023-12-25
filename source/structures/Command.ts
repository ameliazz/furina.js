import { CommandOption, CommandData, RunData } from '@/@types/Command'

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

    run(data: RunData) {
        this.#raw.run({
            ...data,
            options: data.options?.filter(
                (option) => this.options?.[option.name],
            ),
        })
    }
}

export default Command
