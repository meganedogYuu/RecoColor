import { isRgb, isHex } from './check';
import { RgbColor } from './Class/RgbColor';
import { typeOf } from './util';

export function rgbToRgbColor(any: any): RgbColor {

  if (!isRgb(any)) return new RgbColor({ r: 0, g: 0, b: 0 });

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
