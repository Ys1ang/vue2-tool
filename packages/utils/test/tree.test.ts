import {
  generateTree,
  mapTree,
  filterTree,
  findTree,
  eachTree,
  flatTree,
} from '../src';

test('确保传入的参数是数组', () => {
  expect(
    generateTree(
      [
        { id: 1, pid: 0 },
        { id: 2, pid: 1 },
        { id: 3, pid: 2 },
      ],
      { id: 'id', pid: 'pid', children: 'children' },
    ),
  ).toMatchObject([
    {
      id: 1,
      pid: 0,
      children: [{ id: 2, pid: 1, children: [{ id: 3, pid: 2 }] }],
    },
  ]);
  expect(
    generateTree(
      [
        { id: 1, pid: 0 },
        { id: 2, pid: 1 },
        { id: 3, pid: 2 },
      ],
      { id: 'id', pid: 'pid' },
    ),
  ).toMatchObject([
    {
      id: 1,
      pid: 0,
      children: [{ id: 2, pid: 1, children: [{ id: 3, pid: 2 }] }],
    },
  ]);
});
test('确保传入的参数是数组', () => {
  expect(
    mapTree(
      [{ id: 1, children: [{ id: 2, children: [] }] }, { id: 3 }, { id: 4 }],
      item => ({ id: item.id.toString() }),
    ),
  ).toMatchObject([
    { id: '1', children: [{ id: '2', children: [] }] },
    { id: '3' },
    { id: '4' },
  ]);
});

test('确保传入的参数是数组', () => {
  expect(
    filterTree(
      [
        { id: 1, children: [{ id: 2, children: [] }] },
        { id: 3 },
        { id: 4, children: [{ id: 5, children: [] }] },
      ],
      item => item.id === 2 || item.id === 4,
    ),
  ).toMatchObject([
    { id: 2, children: [] },
    { id: 4, children: [{ id: 5, children: [] }] },
  ]);

  expect(
    filterTree(
      [
        { id: 1, children: [{ id: 2, children: [] }] },
        { id: 3 },
        { id: 4, children: [{ id: 5, children: [] }] },
      ],
      item => item.id === 2 || item.id === 4,
      { checkChildren: true, children: 'children' },
    ),
  ).toMatchObject([
    { id: 2, children: [] },
    { id: 4, children: [] },
  ]);

  expect(
    findTree(
      [
        { id: 1, children: [{ id: 2, children: [{ id: 6, children: [] }] }] },
        { id: 3 },
        { id: 4, children: [{ id: 5, children: [] }] },
      ],
      item => item.id === 5,
    ),
  ).toMatchObject({ id: 5, children: [] });

  var test = () => {
    var oldTree = [
      { id: 1, children: [{ id: 2, children: [{ id: 6, children: [] }] }] },
      { id: 3, children: [] },
      { id: 4, children: [{ id: 5, children: [] }] },
    ];
    eachTree(oldTree, item => (item.id += 1));
    return oldTree;
  };
  expect(test()).toMatchObject([
    { id: 2, children: [{ id: 3, children: [{ id: 7, children: [] }] }] },
    { id: 4, children: [] },
    { id: 5, children: [{ id: 6, children: [] }] },
  ]);
});

test('树扁平化', () => {
  const node4 = { pid: 3, id: 4 };
  const node3 = { pid: 1, id: 3, children: [node4] };
  const node2 = { pid: 1, id: 2 };
  const node1 = {
    id: 1,
    pid: 0,
    children: [node2, node3],
  };
  expect(flatTree([node1], item => item)).toEqual([node1, node2, node3, node4]);
});
