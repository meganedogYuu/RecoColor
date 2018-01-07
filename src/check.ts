/**
 * RGB値かの判定を行う
 * OK: [10,10,10], "rgb(10, 10, 10)", "RGB(10, 10, 10)"
 *
 * 条件:
 * - 配列の場合
 *   - 配列の要素数が3つであること
 *   - 3つの数値が0 ~ 255の数値であること
 * - 文字列で受け取る場合:
 *   - 先頭がrgb、RGBで始まること
 *   - rgbの文字列の後の数値が()で囲まれていること
 *   - ()の中の数値が","で区切られた数値が3つあること
 *   - 3つの数値が0 ~ 255の数値であること
 *
 * @param val
 * @returns {boolean}
 */
export function isRgb(val: any): boolean {
  // 配列の場合
  if (val instanceof Array) {
    // 配列の全ての数値が0~255であること
    return isRgbLength(val) && isRgbNumberFromArray(val);
  }

  // 文字列の場合
  if (typeof val === 'string') {
    // 先頭文字列が"rgb"で始まること、()で囲んでいること
    const regexp = new RegExp(/^rgb\(.+\)/, 'i');
    if (!regexp.test(val)) return false;

    // ","でsplitした数値の配列にする
    const strArr: string[] = val.replace(/^rgb\((.+)\)/i, '$1').split(',');
    const numArr: number[] = strArr.map(str => parseInt(str, 10));

    // 数値が3ケタであり、数値が全て0~255であること
    return (isRgbLength(numArr) && isRgbNumberFromArray(numArr));

  }

  return false;

  /**
   * 受け取った配列が3ケタであるかの判定をする
   *
   * @param {any[]} val
   * @returns {boolean}
   */
  function isRgbLength(val: any[]): boolean {
    return val.length === 3;
  }

  /**
   * 受け取った数値が0 ~ 255のRGBの数値であるか判定する
   *
   * @param {number} num
   * @returns {boolean}
   */
  function isRgbNumberFromNumber(num: number): boolean {
    return 0 <= num && num <= 255;
  }

  /**
   * 受け取った配列の数値が全て0 ~ 255のRGBの数値であるか判定する
   * @param {number[]} arr
   * @returns {boolean}
   */
  function isRgbNumberFromArray(arr: number[]): boolean {
    return arr.every(e => isRgbNumberFromNumber(e));
  }
}

/**
 * HEX値かの判定を行う
 * OK: "#ff0000", "#ff0", "ff0000", "ff0"
 *
 * 条件:
 * - #が付く場合は最初につくこと
 * - #を外した状態で3ケタ・6ケタであること
 * - 0~fの値であること
 *
 * @param {string} val
 * @returns {boolean}
 */
export function isHex(val: string): boolean {

  // "#"が付く場合は最初につくこと
  if (val.includes('#') && !/^#.+/.test(val)) return false;

  // #を外した状態で3ケタ・6ケタであること
  const hex: string = val.includes('#') ? val.replace('#', '') : val;
  if (hex.length !== 3 && hex.length !== 6) return false;

  // 0~fの値であること
  return (/^[0-9a-fA-F]*$/.test(hex));
}
