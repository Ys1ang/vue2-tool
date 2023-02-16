export function get<T extends {}, K extends keyof T, R>(
    object: T,
    key: K | ((obj: T) => R),
) {
    return typeof key === 'function' ? key(object) : object[key];
}

export function generateMap<T extends {}>(arr: T[], key: any, value: any) {
    return arr.reduce((map, item) => {
        map[get(item, key) as unknown as string] = get(item, value);
        return map;
    }, {} as Record<string, any>);
}