export type EnsureNotArray<T> = T extends Array<infer P> ? P : T;

export function ensureArray(source?: any): Array<any> {
    if (source == null) return [];
    if (Array.isArray(source)) return source;
    return [source];
}

export function ensureNotArray<T>(source?: T): EnsureNotArray<T> {
    return Array.isArray(source) ? source[0] : source;
}

export function ensureEnum<T>(value: T, list: T[]): T {
    return list.includes(value) ? value : list[0];
}

export function tuple<T extends Array<string | number | boolean>>(...args: T) {
    return args;
}
