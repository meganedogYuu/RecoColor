import { HsvObject } from '../interface/HsvObject'

/**
 * 受け取った配列が3ケタであるかの判定をする
 *
 * @param {any[]} val
 * @returns {boolean}
 */
export function isRgbLength(val: any[]): boolean {
  return val.length === 3
}

/**
 * 受け取った数値が0 ~ 255のRGBの数値であるか判定する
 *
 * @param {number} num
 * @returns {boolean}
 */
export function isRgbNumberFromNumber(num: number): boolean {
  return 0 <= num && num <= 255
}

/**
 * 受け取った配列の数値が全て0 ~ 255のRGBの数値であるか判定する
 * @param {number[]} arr
 * @returns {boolean}
 */
export function isRgbNumberFromArray(arr: number[]): boolean {
  return arr.every(e => isRgbNumberFromNumber(e))
}

/**
 * 受け取ったhsvのオブジェクトの値が正しい値かを判定する
 * - h・・0 ~ 360
 * - s・・0 ~ 100
 * - v・・0 ~ 100
 * @param {{h: number; s: number; v: number}} obj
 * @returns {boolean}
 */
export function isHsvNumberFromObject(obj: HsvObject): boolean {
  return 0 <= obj.h && obj.h <= 360 && 0 <= obj.s && obj.s <= 100 && 0 <= obj.v && obj.v <= 100
}

/**
 * オブジェクトの型を判定するためのメソッド
 * Object型を判定するために使う
 *
 * @param obj
 * @returns {string}
 */
export function typeOf(obj): string {
  const toString = Object.prototype.toString
  return toString.call(obj).slice(8, -1).toLowerCase()
}

/**
 * null もしくは undefined の場合 true を返す
 *
 * @param obj
 * @returns {boolean}
 */
export function isNullOrUndefined(obj: any): boolean {
  return obj === undefined || obj === null
}

/**
 * 受け取った数値（value）を指定の計算をし変換して返す
 *
 * type:
 *   - "round"（四捨五入）・"ceil"（切り上げ）・"floor"（切り捨て）, "original"（そのまま）の4つを受け取る
 *   - 大文字小文字は問わない
 *   - 前後の空白も問わない
 *   - 値が設定されていない、間違った文字列の場合、Roundを指定する
 * decimal:
 *   - 求める位
 *
 * ex1: highMath(12.11, 'round', 0) => 12
 * ex2: highMath(12.11, 'ceil', 1) => 12.2
 *
 * @param {number} value
 * @param {string} type
 * @param {number} decimal
 * @returns {number}
 */
export function highMath(value: number, type: string = 'round', decimal: number = 0): number {
  // type の余計な空白を削除、小文字に変換
  const lowerType: string = type.trim().toLowerCase()
  // original が設定されている場合、そのままの値を返す
  if (lowerType === 'original') return value
  // 該当する文字列を設定
  const t = lowerType === 'ceil' ? 'ceil' : lowerType === 'floor' ? 'floor' : 'round'

  switch (t) {
    case 'round':
      return decimal === 0 ? Math.round(value) : Math.round(value * 10 ** decimal) / 10 ** decimal
    case 'ceil':
      return decimal === 0 ? Math.ceil(value) : Math.ceil(value * 10 ** decimal) / 10 ** decimal
    case 'floor':
      return decimal === 0 ? Math.floor(value) : Math.floor(value * 10 ** decimal) / 10 ** decimal
  }
}
