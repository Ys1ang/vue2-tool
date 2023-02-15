import { ensureArray, ensureEnum, ensureNotArray, tuple } from '../src';

test('确保传入的参数是数组', () => {
    expect(ensureArray(null)).toEqual([]);
    expect(ensureArray()).toEqual([]);
    expect(ensureArray(['1'])).toEqual(['1']);
    expect(ensureArray('1')).toEqual(['1']);
});

test('确保值在枚举范围内', () => {
    const fruits = tuple('🍎', '🍉', '🍏', '🍓');
    expect(ensureEnum('🍎', fruits)).toEqual('🍎');
    expect(ensureEnum('🍉', fruits)).toEqual('🍉');
    expect(ensureEnum('🍖', fruits)).toEqual('🍎');
});

test('确保传入的参数不是数组', () => {
    expect(ensureNotArray([1])).toEqual(1);
    expect(ensureNotArray('1')).toEqual('1');
    expect(ensureNotArray([])).toEqual(undefined);
    expect(ensureNotArray()).toEqual(undefined);
});
