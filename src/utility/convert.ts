import { isRgb, isHex } from './check';
import { RgbColor } from '../member/RgbColor';
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

/**
 * RgbColorオブジェクトをhsv値に変換する
 * それぞれのとれる値の範囲は以下とし、また値を丸めずに返す
 * H（色相）： 0 ~ 360
 * S（彩度）： 0 ~ 100
 * V（明度）： 0 ~ 100
 *
 * @param {RgbColor} rgbColor
 * @returns { h: number; s: number; v: number }
 */
export function rgbColorToHsv(rgbColor: RgbColor): { h: number, s: number, v: number } {
  const max = Math.max(rgbColor.r, rgbColor.g, rgbColor.b);
  const min = Math.min(rgbColor.r, rgbColor.g, rgbColor.b);

  // minとmaxが同じ無彩色の場合は、色相と彩度は存在しないため、明度のみ設定して返す
  if (max === min) return { h: 0, s: 0, v: (max / 255) * 100 };

  // 色相の値を求める
  let h = 0;
  if (rgbColor.r === max) {
    h = 60 * ((rgbColor.g - rgbColor.b) / (max - min));
  }else if (rgbColor.g === max) {
    h = 60 * ((rgbColor.b - rgbColor.r) / (max - min)) + 120;
  }else if (rgbColor.b === max) {
    h = 60 * ((rgbColor.r - rgbColor.g) / (max - min)) + 240;
  }
  // hがマイナス値になった場合は360を足す事で0 ~ 360 の範囲に収める
  if (h < 0) h += 360;

  // 彩度
  const s = ((max - min) / max) * 100;

  // 明度
  const v = (max / 255) * 100;

  return { h, s, v };
}


/**
 * 受け取ったRgbColorの反対色を求め、RgbColorとして返す
 *
 * @param {RgbColor} rgbColor
 * @returns {RgbColor}
 */
export function getClashingColorFrom(rgbColor: RgbColor): RgbColor {

  return new RgbColor({ r: getClashing(rgbColor.r), g: getClashing(rgbColor.g), b: getClashing(rgbColor.b) });

  // 受け取った色の反対色にあたる値を取得する
  function getClashing(num: number): number {
    const maxValue = 255;
    return maxValue - num;
  }
}


/**
 * 受け取ったRgbColorの補色を求め、RgbColorとして返す
 *
 * @param {RgbColor} rgbColor
 * @returns {RgbColor}
 */
export function getComplementaryColorFrom(rgbColor: RgbColor): RgbColor {
  // 最小値と最大値から補色を求めるための元となる数値を求める
  const min = Math.min.apply(null, [rgbColor.r, rgbColor.g, rgbColor.b]);
  const max = Math.max.apply(null, [rgbColor.r, rgbColor.g, rgbColor.b]);
  const foundationValue = min + max;

  return new RgbColor({
    r: (foundationValue - rgbColor.r),
    g: (foundationValue - rgbColor.g),
    b: (foundationValue - rgbColor.b)
  });
}
