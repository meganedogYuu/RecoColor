import { isRgbLength, isRgbNumberFromArray, isHsvNumberFromObject, typeOf } from './util';
import { ColorType } from '../member/ColorType';

/**
 * RGB値かの判定を行う
 * OK: [10,10,10], "rgb(10, 10, 10)", "RGB(10, 10, 10)", {r: 10, g, 20, b:30}
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
 * - オブジェクト型の場合:
 *   - r・g・b それぞれのkeyが存在すること
 *   - それぞれのkeyに設定された値が数値でありかつ0~255であること
 *
 * @param val
 * @returns {boolean}
 */
export function isRgb(val: any): boolean {
  // 配列の場合
  if (val instanceof Array) {
    // 全要素のケタ数が3ケタであり、全要素の値が0~255であること
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

  // オブジェクト型の場合
  if (typeOf(val) === 'object') {
    // RGBそれぞれの値を取得
    const r: number = parseInt(val.r, 10);
    const g: number = parseInt(val.g, 10);
    const b: number = parseInt(val.b, 10);

    // 全ての値が0~255であるかの確認
    return isRgbNumberFromArray([r, g, b]);
  }

  return false;
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
 * @param {any} val
 * @returns {boolean}
 */
export function isHex(val: any): boolean {
  // 文字列かの判定
  if (typeof val !== 'string') return false;

  const str: string = val;

  // "#"が付く場合は最初につくこと
  if (str.includes('#') && !/^#.+/.test(str)) return false;

  // #を外した状態で3ケタ・6ケタであること
  const hex: string = str.includes('#') ? str.replace('#', '') : str;
  if (hex.length !== 3 && hex.length !== 6) return false;

  // 0~fの値であること
  return (/^[0-9a-fA-F]*$/.test(hex));
}

/**
 * HSV値かの判定を行う
 * OK: "hsv(30, 20, 10)", "HSV(30, 20, 10)", {h:30, s: 20, v: 10}
 *
 * 条件:
 * - 配列はRGBとして判定するためHSVでは使用出来ない
 * - 文字列:
 *   - hsv という文字が大文字・小文字問わず頭に指定されていること
 *   - rgbの文字列の後の数値が()で囲まれていること
 *   - ()の中の数値が","で区切られた数値が3つあること
 * - オブジェクト型:
 *   - h・s・v 全てに値が設定されていること
 * - 文字列・オブジェクト共通:
 *   - 以下の値であること
 *     - h・・0 ~ 360
 *     - s・・0 ~ 100
 *     - v・・0 ~ 100
 *
 * @param val
 * @returns {boolean}
 */
export function isHsv(val: any): boolean {
  // 文字列の場合
  if (typeof val === 'string') {
    // 先頭文字列が"hsv"で始まること、()で囲んでいること
    const regexp = new RegExp(/^hsv\(.+\)/, 'i');
    if (!regexp.test(val)) return false;

    // ","でsplitした数値の配列にする
    const strArr: string[] = val.replace(/^hsv\((.+)\)/i, '$1').split(',');
    const numArr: number[] = strArr.map(str => parseInt(str, 10));

    // 配列からhsvの値を取得し、正常値の中に入っているか判定する
    const [h, s, v] = [numArr[0], numArr[1], numArr[2]];
    return isHsvNumberFromObject({ h, s, v });
  }

  // オブジェクト型の場合
  if (typeOf(val) === 'object') {
    // HSV それぞれの値を取得
    const h: number = parseInt(val.h, 10);
    const s: number = parseInt(val.s, 10);
    const v: number = parseInt(val.v, 10);

    return isHsvNumberFromObject({ h, s, v });
  }

  return false;
}


/**
 * 受け取った値がどのタイプに相当するか判定し名前を返す
 *
 * @param any
 * @returns {string} "RGB", "HEX", "none"の3種類
 */
export function getType(any: any): string {
  if (isRgb(any)) return 'RGB';
  if (isHex(any)) return 'HEX';
  return 'none';
}

/**
 * 引数で受け取ったオプション名の文字列から色のタイプを判定する
 * 'HEX' or 'Hex' or 'hex' の場合のみ ColorType.Hex を返す
 * それ以外の場合は ColorType.Rgb を返す
 *
 * @param {string} optionName
 * @returns {ColorType}
 */
export function getColorTypeFrom(optionName: string): ColorType {
  if (optionName === 'HEX' || optionName === 'Hex' || optionName === 'hex') {
    return ColorType.Hex;
  }
  return ColorType.Rgb;
}
