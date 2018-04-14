import { isRgb, isHex, isHsv } from './check';
import { RgbColor } from '../member/RgbColor';
import { typeOf } from './util';

/**
 * rgb値をRgbオブジェクトに変換する
 *
 * @param any
 * @returns {{r: number; g: number; b: number}}
 */
export function rgbToRgbObject(any: any): { r: number, g: number, b: number } {

  if (!isRgb(any)) return;

  // 配列の場合
  if (any instanceof Array) {
    return { r: any[0], g: any[1], b: any[2] };
  }

  // 文字列の場合
  if (typeof any === 'string') {
    const rgbArr: number[] = any.replace(/rgb\((.+)\)/i, '$1').split(',').map(e => parseInt(e, 10));
    return { r: rgbArr[0], g: rgbArr[1], b: rgbArr[2] };
  }

  // オブジェクト型の場合
  if (typeOf(any) === 'object') {
    return { r: any.r, g: any.g, b: any.b };
  }

  return { r: 0, g: 0, b: 0 };
}


/**
 * hex値をRgbオブジェクトに変換する
 *
 * @param {string} hex
 * @returns {{r: number; g: number; b: number}}
 */
export function hexToRgbObject(hex: string): { r: number, g: number, b: number } {

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

  return { r, g, b };
}

/**
 * HSV値をRgbオブジェクトに変換する
 *
 * @param any
 * @returns {{r: number; g: number; b: number}}
 */
export function hsvToRgbObject(any: any): { r: number, g: number, b: number } {
  // HSVの値でなかった場合はそのままreturn
  if (!isHsv(any)) return;

  let h: number;
  let s: number;
  let v: number;

  // 文字列の場合
  if (typeof any === 'string') {
    // HSVそれぞれの値を取得
    const hsvArr: number[] = any.replace(/hsv\((.+)\)/i, '$1').split(',').map(e => parseInt(e, 10));
    [h, s, v] = [hsvArr[0], hsvArr[1], hsvArr[2]];
  }

  // オブジェクト型の場合
  if (typeOf(any) === 'object') {
    [h, s, v] = [any.h, any.s, any.v];
  }

  // RGBのどれかの最大値・最小値を求める
  const max = v / 100 * 255;
  const min = max - ((s / 100) * max);

  // 色相によって求め方が変わるため、色相の値から計算を行い、RGBのオブジェクトにして返す
  // 補足：
  // 色相（h）が 0 は赤（h: 0, s: 100, v:100）は (r: 255, g: 0, b: 0)
  // 値が増える毎に 緑 を混ぜる事になり、hの値が120の時 緑 になる（h: 120, s: 100, v:100）は (r: 0, g: 255, b: 0)
  // 更にhの値が増えると 青 を混ぜる事になり、hの値が240の時 青 になる（h: 240, s: 100, v:100）は (r: 0, g: 0, b: 255)
  // 更にhの値が増えると 赤 を混ぜる事になり、hの値が360の時 赤 に戻る（h: 360, s: 100, v:100）は (r: 255, g: 0, b: 0)
  if (0 <= h && h <= 60) return { r: max, g: (h / 60) * (max - min) + min, b: min };
  if (60 < h && h <= 120) return { r: ((120 - h) / 60) * (max - min) + min, g: max, b: min };
  if (120 < h && h <= 180) return { r: min, g: max, b: ((h - 120) / 60) * (max - min) + min };
  if (180 < h && h <= 240) return { r: min, g: ((240 - h) / 60) * (max - min) + min, b: max };
  if (240 < h && h <= 300) return { r: ((h - 240) / 60) * (max - min) + min, g: min, b: max };
  if (300 < h && h <= 360) return { r: max, g: min, b: ((360 - h) / 60) * (max - min) + min };
}


/**
 * Rgbオブジェクトをhex値に変換する
 *
 * @param {{r: number; g: number; b: number}} rgb
 * @returns {string}
 */
export function rgbObjectToHex(rgb: { r: number, g: number, b: number }): string {

  return `${numberToTwoDigitHex(rgb.r)}${numberToTwoDigitHex(rgb.g)}${numberToTwoDigitHex(rgb.b)}`;

  function numberToTwoDigitHex(num: number): string {
    const hex = num.toString(16);
    return hex.length === 1 ? `0${hex}` : `${hex}`;
  }
}

/**
 * Rgbオブジェクトをhsv値に変換する
 * それぞれのとれる値の範囲は以下とし、また値を丸めずに返す
 * H（色相）： 0 ~ 360
 * S（彩度）： 0 ~ 100
 * V（明度）： 0 ~ 100
 *
 * @param {{r: number; g: number; b: number}} rgb
 * @returns { h: number; s: number; v: number }
 */
export function rgbToHsv(rgb: { r: number, g: number, b: number }): { h: number, s: number, v: number } {
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);

  // minとmaxが同じ無彩色の場合は、色相と彩度は存在しないため、明度のみ設定して返す
  if (max === min) return { h: 0, s: 0, v: (max / 255) * 100 };

  // 色相の値を求める
  let h = 0;
  if (rgb.r === max) {
    h = 60 * ((rgb.g - rgb.b) / (max - min));
  }else if (rgb.g === max) {
    h = 60 * ((rgb.b - rgb.r) / (max - min)) + 120;
  }else if (rgb.b === max) {
    h = 60 * ((rgb.r - rgb.g) / (max - min)) + 240;
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
