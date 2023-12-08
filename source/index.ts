import Collection from '@/structures/Collection.js'
import Command from '@/structures/Command.js'
import Responses from './commands/Responses.js'

class Furina {
    name: string
    version: string
    commands: Collection<Command> = new Collection('commands')
    responses: Collection<Command> = new Collection(
        'responses',
        Responses.map((responseCommand) => {
            return [responseCommand.name, responseCommand]
        }),
    )

    constructor(options: Options) {
        this.name = options.name
        this.version = options.version
    }

    add(command: Command) {
        this.commands.set(command.name, command)
        return true
    }

    exec() {
        const argv = process.argv.slice(2)
        const commandName = String(argv.shift())
        const command = this.commands.get(commandName)

        if (!command) {
            this.responses.get('@unknown_command')?.run([], commandName)
            return
        }

        const commonArguments = argv.filter(
            (arg) => !arg.startsWith('--') || !arg.startsWith('-'),
        )

        const rawOptions = argv.filter(
            (arg) => arg.startsWith('--') || arg.startsWith('-'),
        )

        let options = []

        for (const rawOption of rawOptions) {
            const match = rawOption.match(/^(-){1,2}(.*)$/)?.[2].split('=')

            options.push({
                name: String(match?.[0]),
                value: match?.[1] || true,
            })

            command.options
        }

        command.run(options, ...commonArguments)
    }
}

export default Furina
export { Collection, Command }
