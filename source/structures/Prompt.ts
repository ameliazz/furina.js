import readline from 'readline'
import { stdin as input, stdout as output } from 'process'

export async function question(query: string): Promise<string> {
    const rl = readline.createInterface({ input, output })

    return new Promise((resolve, reject) => {
        return rl.question(query, (answer) => {
            rl.close()
            resolve(answer)
        })
    })
}

export default class Prompt {
    prefix?: string

    constructor(opts?: { prefix?: string }) {
        this.prefix = opts?.prefix || ''
    }

    async select({
        message,
        choices = [],
        prefixSelect = '>',
    }: {
        //TODO: Change the input to something more specific
        message: string
        choices: {
            name: string
            value: string
            description?: string
        }[]
        prefixSelect?: string
    }) {
        let select = 0
        function selectMenuText() {
            let selection = ''
            for (let c = 0; c < choices.length; c++) {
                selection += `${
                    c == select ? prefixSelect : ' '.repeat(prefixSelect.length)
                } ${choices[c].name}\n`
            }
            return selection
        }

        console.log(`${this.prefix} ${message} `)
        console.log(selectMenuText())
        process.stdin.on('keypress', (str, key) => {
            if (key.name == 'down' && select < choices.length - 1) select += 1
            else if (key.name == 'up' && select > 0) select -= 1
            else return
            process.stdout.moveCursor(0, -choices.length - 1)
            process.stdout.clearLine(1)
            console.log(selectMenuText())
        })
        await question('')
        return choices[select]
    }

    async input<
        T extends 'string' | 'number' | number,
        R = T extends 'number' ? number : string,
    >({
        message,
        type = 'string' as T,
        require,
        error,
    }: {
        message: string
        error?: string
        require?: boolean
        type: T
    }): Promise<R> {
        //TODO: Add message error
        const response = (
            await question(`${this.prefix} ${message} `)
        ).toLocaleLowerCase()
        if (type == 'string' && require == true && !response) {
            return this.input({ message, error, type, require })
        } else if (
            type == 'number' &&
            require == true &&
            isNaN(Number(response))
        ) {
            return this.input({ message, error, type, require })
        }

        return (type == 'string' ? response : Number(response)) as R
    }

    async confirm({
        message,
        _default,
    }: {
        message: string
        _default?: boolean
    }): Promise<boolean> {
        const response = (
            await question(`${this.prefix} ${message} `)
        ).toLocaleLowerCase()
        if (response == 'y' || response == 'yes') {
            return true
        } else if (response == 'n' || response == 'no') {
            return false
        } else return _default || false
    }
}
