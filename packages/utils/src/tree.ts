import { TreeItem, PickTypeKey } from "./type";
import { generateMap } from './object';

/**
 * @name 将一维数组转换为树结构
 * @param list 原数组
 * @param props 配置项
 */
export function generateTree<T extends {}>(
  list: T[],
  props: {
    id: PickTypeKey<T, string | number>;
    pid: PickTypeKey<T, string | number | null>;
    children?: string;
  },
): TreeItem<T>[] {
  const childrenKey = (props.children || 'children') as 'children';
  const tree: TreeItem<T>[] = [];
  const map: Record<string, T> = generateMap(list, props.id, node => node);
  list.forEach(node => {
    const parentNode = map[node[props.pid] as unknown as string] as TreeItem<T>;
    if (parentNode) {
      parentNode[childrenKey] = parentNode[childrenKey] || [];
      parentNode[childrenKey]!.push(node);
    } else {
      tree.push(node);
    }
  });
  return tree;
}

/**
 * Array.forEach的树结构实现
 * @param tree
 * @param each
 * @param props
 * @param props.children 子元素键
 */
export function eachTree<T extends {}>(
  tree: TreeItem<T>[],
  each: (item: TreeItem<T>) => void,
  props: { children: 'children' } = { children: 'children' },
): void {
  tree.forEach(item => {
    each(item);
    Array.isArray(item[props.children]) &&
      eachTree(item[props.children]!, each, props);
  });
}

/**
 * Array.map的树结构实现
 * @param tree
 * @param map
 * @param props
 * @param props.children 子元素键
 */
export function mapTree<T extends {}, TResult extends {}>(
  tree: TreeItem<T>[],
  map: (item: TreeItem<T>) => TreeItem<TResult>,
  props: { children: 'children' } = { children: 'children' },
): TreeItem<TResult>[] {
  return tree.map(item => {
    const arr = item[props.children];
    if (Array.isArray(arr)) {
      return {
        ...map(item),
        [props.children]: mapTree(arr, map, props),
      };
    } else {
      return map(item);
    }
  });
}

/**
 * Array.find的树结构实现
 * @param tree
 * @param find
 * @param props
 * @param props.children 子元素键
 */
export function findTree<T extends {}>(
  tree: TreeItem<T>[],
  find: (item: TreeItem<T>) => boolean,
  props: { children: 'children' } = { children: 'children' },
): TreeItem<T> | undefined {
  let result: TreeItem<T> | undefined = undefined;
  tree.some(item => {
    result = find(item)
      ? item
      : findTree(item[props.children] || [], find, props);
    return !!result;
  });
  return result;
}

/**
 * Array.filter的树结构实现
 * @param tree
 * @param filter
 * @param props
 * @param props.children 子元素键 props.checkChildren 是否过滤掉子节点
 */
export function filterTree<T extends {}>(
  tree: TreeItem<T>[],
  filter: (item: TreeItem<T>) => boolean,
  props: { children: 'children'; checkChildren?: boolean } = {
    children: 'children',
    checkChildren: false,
  },
): TreeItem<T>[] {
  if (!(tree && tree.length)) {
    return [];
  }
  const newChildren: TreeItem<T>[] = [];
  tree.forEach(node => {
    const children = node[props.children] || [];
    if (filter(node)) {
      newChildren.push(node);
      if (props.checkChildren && children && children.length) {
        node[props.children] = filterTree(children, filter, props);
      }
    } else {
      newChildren.push(...filterTree(children, filter, props));
    }
  });
  return newChildren;
}

/**
 * 树结构扁平化
 * @param tree
 * @param flat
 * @param props
 * @param props.children 子元素键
 */
export function flatTree<T extends {}, TResult extends {}>(
  tree: TreeItem<T>[],
  flat: (item: TreeItem<T>) => TreeItem<TResult> | TreeItem<TResult>[],
  props: { children: 'children' } = { children: 'children' },
): TreeItem<TResult>[] {
  return tree.reduce((result: TreeItem<TResult>[], current: TreeItem<T>) => {
    return result.concat(
      flat(current),
      Array.isArray(current[props.children])
        ? flatTree(current[props.children]!, flat, props)
        : [],
    );
  }, []);
}
