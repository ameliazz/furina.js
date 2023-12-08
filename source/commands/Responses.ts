import log from '@/log.js'
import Command from '../structures/Command.js'

const UnknownCommandResponse = new Command({
    name: '@unknown_command',
    description: '',
    options: [],
    run(_, ...args) {
        log(
            `Unknown Command: '${args[0]}'. Run the help command to find out all the available commands`,
        )
    },
})

export default [UnknownCommandResponse]
