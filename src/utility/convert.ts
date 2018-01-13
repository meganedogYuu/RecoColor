import { isRgb, isHex } from './check';
import { RgbColor } from '../class/RgbColor';
import { typeOf, isNullOrUndefined } from './util';

/**
 * rgb値をRgbColorクラスに変換する
 *
 * @param any
 * @returns {RgbColor}
 */
export function rgbToRgbColor(any: any): RgbColor {

  if (!isRgb(any)) return;

  // 配列の場合
  if (any instanceof Array) {
    return new RgbColor({ r: any[0], g: any[1], b: any[2] });
  }

  // 文字列の場合
  if (typeof any === 'string') {
    const rgbArr: number[] = any.replace(/rgb\((.+)\)/i, '$1').split(',').map(e => parseInt(e, 10));
    return new RgbColor({ r: rgbArr[0], g: rgbArr[1], b: rgbArr[2] });
  }

  // オブジェクト型の場合
  if (typeOf(any) === 'object') {
    return new RgbColor({ r: any.r, g: any.g, b: any.b });
  }

  return new RgbColor({ r: 0, g: 0, b: 0 });
}


/**
 * hex値をRgbColorクラスに変換する
 *
 * @param {string} hex
 * @returns {RgbColor}
 */
export function hexToRgbColor(hex: string): RgbColor {

  if (!isHex(hex)) return;

  // "#"がある場合はなくす
  const exclusionHex: string = hex.includes('#') ? hex.replace('#', '') : hex;

  // 強制的に6文字のhex値にする
  const sixCharacterHex: string = exclusionHex.length === 3
    ? exclusionHex.split('').reduce((previous, current) => `${previous}${current}${current}`, '')
    : exclusionHex;

  const r: number = parseInt(sixCharacterHex.substring(0, 2), 16);
  const g: number = parseInt(sixCharacterHex.substring(2, 4), 16);
  const b: number = parseInt(sixCharacterHex.substring(4, 6), 16);

  return new RgbColor({ r, g, b });
}


/**
 * RgbColorオブジェクトをhex値に変換する
 *
 * @param {RgbColor} rgbColor
 * @returns {string}
 */
export function rgbColorToHex(rgbColor: RgbColor): string {

  if (isNullOrUndefined(rgbColor)) return;

  return `${numberToTwoDigitHex(rgbColor.r)}${numberToTwoDigitHex(rgbColor.g)}${numberToTwoDigitHex(rgbColor.b)}`;

  function numberToTwoDigitHex(num: number): string {
    const hex = num.toString(16);
    return hex.length === 1 ? `0${hex}` : `${hex}`;
  }
}
