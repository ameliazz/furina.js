import Furina, { Command } from './dist/index.js'
import {
    InputCollector,
    SelectMenuCollector,
    Question,
} from './dist/structures/Collector.js'

const app = new Furina({
    name: 'test',
})

const cmd = new Command({
    name: 'tests',
    description: '',
    run: async () => {
        const question = await Question('You want chocolate?')

        const Input = await new InputCollector({
            question: 'Type a number',
            errorMessage: 'Can you type a number, please?',
            responseType: 'number',
        }).collect()

        const Input2 = await new SelectMenuCollector({
            question: 'Select one letter',
            choices: [
                {
                    name: 'a',
                    value: 1,
                },
                {
                    name: 'b',
                    value: 2,
                },
            ],
        }).collect()

        console.log(question, Input, Input2)
    },
})

app.add(cmd)
app.exec()
