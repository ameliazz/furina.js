import readline from 'readline'
import { stdin as input, stdout as output } from 'process'

function question(query: string): Promise<string> {
    const rl = readline.createInterface({ input, output })

    return new Promise((resolve, reject) => {
        return rl.question(query, (answer) => {
            rl.close()
            resolve(answer)
        })
    })
}

const Question = async (
    message: string,
    prefix: string = '?',
    defaultResponse: boolean = false,
): Promise<boolean> => {
    const response = (
        await question(
            `\u001b[104m ${prefix} \u001b[49m ${message} \u001b[90m(${
                defaultResponse ? 'y' : 'n'
            })\u001b[39m `,
        )
    ).toLowerCase()

    return !response
        ? defaultResponse
        : ['y', 'yes', 'n', 'no'].includes(response)
}

class InputCollector {
    question: string
    questionPrefix?: string
    responseType: 'number' | 'text' | 'any'
    required?: boolean
    errorMessage?: string

    constructor(options: {
        question: string
        questionPrefix?: string
        responseType?: 'number' | 'text' | 'any'
        required?: boolean
        errorMessage?: string
    }) {
        this.question = options.question
        this.required = options?.required || true
        this.responseType = options?.responseType || 'any'
        this.errorMessage = options?.errorMessage
        this.questionPrefix = options?.questionPrefix || '?'
    }

    async collect(): Promise<string | number> {
        const response = await question(
            `\u001b[104m ${this.questionPrefix} \u001b[49m ${this.question} `,
        )

        if (
            this.responseType != 'any' && !isNaN(Number(response))
                ? response.length >= 1 && this.responseType == 'text'
                : this.responseType == 'number'
        ) {
            console.log(`\u001b[101m X \u001b[49m ${this.errorMessage}`)
            return this.collect()
        }

        return isNaN(Number(response)) ? response : Number(response)
    }
}

class SelectMenuCollector {
    question: string
    questionPrefix?: string
    choices: Choice[]

    constructor(options: {
        question: string
        questionPrefix?: string
        choices: Choice[]
    }) {
        this.question = options.question
        this.questionPrefix = options?.questionPrefix || '+'
        this.choices = options.choices
    }

    async collect(): Promise<Choice> {
        let selectedIndex = 0

        function generateSelectionTable(
            choices: Choice[],
            questionPrefix: string,
        ) {
            let table = ''

            for (let choice = 0; choice < choices.length; choice++) {
                table += `${
                    choice == selectedIndex
                        ? '▸'
                        : ' '.repeat(String(questionPrefix).length)
                } ${choices[choice].name}\n`
            }

            return table
        }

        console.log(
            `\u001b[104m ${this.questionPrefix} \u001b[49m ${this.question} `,
        )
        console.log(
            generateSelectionTable(this.choices, String(this.questionPrefix)),
        )

        const event = process.stdin.on('keypress', (_, key) => {
            if (key.name == 'down' && selectedIndex < this.choices.length - 1)
                selectedIndex += 1

            switch (key.name) {
                case 'down':
                    selectedIndex < this.choices.length - 1
                        ? (selectedIndex += 1)
                        : ''
                    break

                case 'up':
                    selectedIndex > 0 ? (selectedIndex -= 1) : ''
                    break

                default:
                    return
            }

            process.stdout.moveCursor(0, -this.choices.length - 1)
            process.stdout.clearLine(1)
            console.log(
                generateSelectionTable(
                    this.choices,
                    String(this.questionPrefix),
                ),
            )
        })

        await question('')

        return this.choices[selectedIndex]
    }
}

export { InputCollector, SelectMenuCollector, Question }
