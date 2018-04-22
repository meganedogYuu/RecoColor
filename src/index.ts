import { isRgb, isHex, isHsv, getType, getColorTypeFrom } from './utility/check';
import { isNullOrUndefined, highMath } from './utility/util';
import { RgbColor } from './member/RgbColor';
import { ColorType } from './member/ColorType';
import * as convert from './utility/convert';
import { RgbObject } from './interface/RgbObject';
import { HsvObject } from './interface/HsvObject';

export default class RecoColor {

  private _originalColor: any;
  private _option: { key?: string };
  private _rgbColor;

  constructor(color: any, opts: { key?: string }) {
    this._originalColor = (color) ? color : '';
    this._option = opts || {};

    this.initSetting();
  }

  /**
   * 新たに色を設定する
   *
   * @param {any} color 設定を行いたい色（ex: {r: 255, g :255, b:128}, "#ff0001", rgb(255, 255, 255)）
   */
  public set(color: any) {
    this._originalColor = color;
    this.initSetting();
  }

  /**
   * 設定した色が"RGB"であったかを判定する
   *
   * @returns {boolean}
   */
  public isRgb(): boolean {
    return isRgb(this._originalColor);
  }

  /**
   * 設定した色が"HEX"であったかを判定する
   *
   * @returns {boolean}
   */
  public isHex(): boolean {
    return isHex(this._originalColor);
  }

  /**
   * 設定した色が HSV かを判定する
   *
   * @returns {boolean}
   */
  public isHsv(): boolean {
    return isHsv(this._originalColor);
  }

  /**
   * 最初もしくはset()で設定した色を返す
   *
   * @returns {any}
   */
  public getOriginal(): any {
    return this._originalColor;
  }

  /**
   * 設定した色のタイプを "RGB", "HEX", "HSV", "none" の中から返す
   *
   * @returns {string}
   */
  public getType(): string {
    return getType(this._originalColor);
  }

  /**
   * HEX値で表した場合の値を返す
   * 設定した値が小数点を含む値の場合、小数点第一位を四捨五入したHEX値を返す
   * 設定した値が正しくない場合は undefined を返す
   *
   * @returns {string}
   */
  public getHex(): string {
    if (isNullOrUndefined(this._rgbColor)) return;
    return convert.rgbObjectToHexString(this._rgbColor.getRgbObject());
  }

  /**
   * RGBのオブジェクト型で表した場合の値を返す
   * 設定した値が正しくない場合は undefined を返す
   *
   * @returns {{r: number; g: number; b: number}}
   */
  public getRgb(): RgbObject {
    if (isNullOrUndefined(this._rgbColor)) return;
    // 小数点の計算を行った値を返す
    return { r: highMath(this._rgbColor.r) , g: highMath(this._rgbColor.g), b: highMath(this._rgbColor.b) };
  }

  /**
   * Rの値をのみを返す
   * 設定した値が正しくない場合は undefined を返す
   *
   * @returns {number}
   */
  public getRed(): number {
    if (isNullOrUndefined(this._rgbColor)) return;
    // 小数点の計算を行った値を返す
    return highMath(this._rgbColor.r);
  }

  /**
   * Gの値をのみを返す
   * 設定した値が正しくない場合は undefined を返す
   *
   * @returns {number}
   */
  public getGreen(): number {
    if (isNullOrUndefined(this._rgbColor)) return;
    // 小数点の計算を行った値を返す
    return highMath(this._rgbColor.g);
  }

  /**
   * Bの値をのみを返す
   * 設定した値が正しくない場合は undefined を返す
   *
   * @returns {number}
   */
  public getBlue(): number {
    if (isNullOrUndefined(this._rgbColor)) return;
    // 小数点の計算を行った値を返す
    return highMath(this._rgbColor.b);
  }

  /**
   * HSVのオブジェクト型で表した場合の値を返す
   * それぞれのとれる値の範囲は以下とし、小数点第一位を四捨五入した値を返す
   * H： 0 ~ 360
   * S： 0 ~ 100
   * V： 0 ~ 100
   * 設定した値が正しくない場合は undefined を返す
   *
   * @returns {{h: number; s: number; v: number}}
   */
  public getHsv(): HsvObject {
    if (isNullOrUndefined(this._rgbColor)) return;

    // 丸めていない値を取得
    const hsv = convert.rgbObjectToHsvObject(this._rgbColor.getRgbObject());
    // 小数点の計算を行った値を返す
    return { h: highMath(hsv.h), s: highMath(hsv.s), v: highMath(hsv.v) };
  }



  /**
   * 反対色を求める
   * option に 'HEX' 'Hex' 'hex' のどれかを指定された場合は HEX値の文字列 を返す
   * それ以外の場合は RGBのオブジェクト を返す
   *
   * @returns {{r: number; g: number; b: number}} | string
   */
  public getClashingColor(option: string = 'RGB'): RgbObject | string {
    if (isNullOrUndefined(this._rgbColor)) return;
    // 反対色の RgbColor を取得
    const clashingColor: RgbColor = convert.getClashingColorFrom(this._rgbColor);

    // option で HEX の指定がある場合HEX値を返す、それ以外の場合 RGBのオブジェクト を返す
    if (getColorTypeFrom(option) === ColorType.Hex) {
      return convert.rgbObjectToHexString(clashingColor.getRgbObject());
    }

    // 小数点の計算を行った値を返す
    const rgb: RgbObject = clashingColor.getRgbObject();
    return { r: highMath(rgb.r), g: highMath(rgb.g), b: highMath(rgb.b) };
  }

  /**
   * 補色を求める
   * option に 'HEX' 'Hex' 'hex' のどれかを指定された場合は HEX値の文字列 を返す
   * それ以外の場合は RGBのオブジェクト を返す
   *
   * @returns {{r: number; g: number; b: number}}
   */
  public getComplementaryColor(option: string = 'RGB'): RgbObject | string {
    if (isNullOrUndefined(this._rgbColor)) return;
    // 補色の RgbColor を取得
    const complementaryColor: RgbColor = convert.getComplementaryColorFrom(this._rgbColor);

    // option で HEX の指定がある場合HEX値を返す、それ以外の場合 RGBのオブジェクト を返す
    if (getColorTypeFrom(option) === ColorType.Hex) {
      return convert.rgbObjectToHexString(complementaryColor.getRgbObject());
    }

    // 小数点の計算を行った値を返す
    const rgb: RgbObject = complementaryColor.getRgbObject();
    return { r: highMath(rgb.r), g: highMath(rgb.g), b: highMath(rgb.b) };
  }

  /**
   * this._originalColor から this._rgbColor に値を設定する
   */
  private initSetting(): void {
    const obj: RgbObject
      = isRgb(this._originalColor) ? convert.rgbToRgbObject(this._originalColor)
      : isHex(this._originalColor) ? convert.hexToRgbObject(this._originalColor)
      : isHsv(this._originalColor) ? convert.hsvToRgbObject(this._originalColor)
      : undefined;

    if (!isNullOrUndefined(obj)) this._rgbColor = new RgbColor(obj);
  }
}
