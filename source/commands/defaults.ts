import log from '@/log.js'
import Command from '@/structures/Command.js'

const HelpCommand = new Command({
    name: 'help',
    description: 'Get help from commands',
    run(data) {
        log(
            data.manager.commands
                .toArray()
                .map((d) => d[1].name)
                .join(', '),
        )
    },
})

export default [HelpCommand]
