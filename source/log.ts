export default (message: string, level: 0 | 1 | 2 = 2) => {
    switch (level) {
        case 0:
            console.error(`\u001b[41m ERROR \u001b[49m ~ ${message}`)
            break

        case 1:
            console.error(`\u001b[43m WARN \u001b[49m ~ ${message}`)
            break

        case 2:
            console.error(`\u001b[44m INFO \u001b[49m ~ ${message}`)
            break
    }
}
