export function ensureArray(source: any): Array<any> {
    if (source == null) return [];
    if (Array.isArray(source)) return source;
    return [source];
}