class Collection<V> extends Map<PropertyKey, V> {
    name: string

    constructor(name: string, values?: Iterable<readonly [PropertyKey, V]>) {
        super(values)
        this.name = name
    }

    all(format: 'JSON' | 'default' = 'default'): string | any[] | object {
        switch (format) {
            case 'JSON':
                return JSON.stringify(Object.fromEntries(this.entries()))
            default:
                return Object.fromEntries(this.entries())
        }
    }

    toArray() {
        return Array.from(this.entries())
    }
}

export default Collection
