import {ensureArray} from "../src";

it('确保传入的都是数组', function () {
    expect(ensureArray(null)).toEqual([]);
})