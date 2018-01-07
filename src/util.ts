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
 * オブジェクトの型を判定するためのメソッド
 * Object型を判定するために使う
 *
 * @param obj
 * @returns {string}
 */
export function typeOf(obj) {
  const toString = Object.prototype.toString;
  return toString.call(obj).slice(8, -1).toLowerCase();
}
