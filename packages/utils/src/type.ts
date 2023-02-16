/** @name 从可迭代对象中取出元素类型 */
export type ItemType<T> = T extends Iterable<infer P> ? P : never;

/**
 * @name 从对象的key中取出满足PickPropType类型的key
 * @template T 要取出key的对象
 * @template PickPropType 要取出的key的类型
 *
 * type StringKey = PickTypeKey<{ a: string, b: number }, string>; // 'a'
 */
export type PickTypeKey<T extends {}, PickPropType> = {
  [K in keyof T]: T[K] extends PickPropType ? K : never;
}[keyof T];

/**
 * @name 从对象的key中排除满足OmitPropType类型的key
 * @template T 要排除key的对象
 * @template OmitPropType 要排除的key的类型
 *
 * type ExcludeStringKey = OmitTypeKey<{ a: string, b: number }, string>; // 'b'
 */
export type OmitTypeKey<T extends {}, OmitPropType> = Exclude<
  keyof T,
  PickTypeKey<T, OmitPropType>
>;

/**
 * @name 从对象中取出满足PickPropType类型的属性
 * @template T 要取出key的对象
 * @template PickPropType 要取出的key的类型
 *
 * type StringKeyObject = PickType<{ a: string, b: number }, string>; // { a: string }
 */
export type PickType<T extends {}, PickPropType> = Pick<
  T,
  PickTypeKey<T, PickPropType>
>;

/**
 * @name 从对象中排除满足OmitPropType类型的key
 * @template T 要排除key的对象
 * @template OmitPropType 要排除的key的类型
 *
 * type ExcludeStringKeyObject = OmitTypeKey<{ a: string, b: number }, string>; // { b: number }
 */
export type OmitType<T extends {}, OmitPropType> = Omit<
  T,
  PickTypeKey<T, OmitPropType>
>;

export type TreeItem<T extends {}> = T & {
  children?: TreeItem<T>[];
};
