/**
 * 受け取った配列が3ケタであるかの判定をする
 *
 * @param {any[]} val
 * @returns {boolean}
 */
export function isRgbLength(val: any[]): boolean {
  return val.length === 3;
}

/**
 * 受け取った数値が0 ~ 255のRGBの数値であるか判定する
 *
 * @param {number} num
 * @returns {boolean}
 */
export function isRgbNumberFromNumber(num: number): boolean {
  return 0 <= num && num <= 255;
}

/**
 * 受け取った配列の数値が全て0 ~ 255のRGBの数値であるか判定する
 * @param {number[]} arr
 * @returns {boolean}
 */
export function isRgbNumberFromArray(arr: number[]): boolean {
  return arr.every(e => isRgbNumberFromNumber(e));
}

/**
 * 受け取ったhsvのオブジェクトの値が正しい値かを判定する
 * - h・・0 ~ 360
 * - s・・0 ~ 100
 * - v・・0 ~ 100
 * @param {{h: number; s: number; v: number}} obj
 * @returns {boolean}
 */
export function isHsvNumberFromObject(obj: {h: number, s: number, v: number}): boolean {
  return (0 <= obj.h && obj.h <= 360) && (0 <= obj.s && obj.s <= 100) && (0 <= obj.v && obj.v <= 100);
}

/**
 * オブジェクトの型を判定するためのメソッド
 * Object型を判定するために使う
 *
 * @param obj
 * @returns {string}
 */
export function typeOf(obj): string {
  const toString = Object.prototype.toString;
  return toString.call(obj).slice(8, -1).toLowerCase();
}

/**
 * null もしくは undefined の場合 true を返す
 *
 * @param obj
 * @returns {boolean}
 */
export function isNullOrUndefined(obj: any): boolean {
  return (obj === undefined || obj === null);
}
