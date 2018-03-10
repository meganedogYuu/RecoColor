import { isRgb, isHex, getType, getColorTypeFrom } from './utility/check';
import { isNullOrUndefined } from './utility/util';
import { RgbColor } from './member/RgbColor';
import { ColorType } from './member/ColorType';
import * as convert from './utility/convert';

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
   * 最初もしくはset()で設定した色を返す
   *
   * @returns {any}
   */
  public getOriginal(): any {
    return this._originalColor;
  }

  /**
   * 設定した色のタイプを "RGB", "HEX", "none" の中から返す
   *
   * @returns {string}
   */
  public getType(): string {
    return getType(this._originalColor);
  }

  /**
   * HEX値で表した場合の値を返す
   * 設定した値が正しくない場合は undefined を返す
   *
   * @returns {string}
   */
  public getHex(): string {
    if (isNullOrUndefined(this._rgbColor)) return;
    return convert.rgbColorToHex(this._rgbColor);
  }

  /**
   * RGBのオブジェクト型で表した場合の値を返す
   * 設定した値が正しくない場合は undefined を返す
   *
   * @returns {{r: number; g: number; b: number}}
   */
  public getRgb(): { r: number, g: number, b: number } {
    if (isNullOrUndefined(this._rgbColor)) return;
    return this._rgbColor.getObject();
  }

  /**
   * Rの値をのみを返す
   * 設定した値が正しくない場合は undefined を返す
   *
   * @returns {number}
   */
  public getRed(): number {
    if (isNullOrUndefined(this._rgbColor)) return;
    return this._rgbColor.r;
  }

  /**
   * Gの値をのみを返す
   * 設定した値が正しくない場合は undefined を返す
   *
   * @returns {number}
   */
  public getGreen(): number {
    if (isNullOrUndefined(this._rgbColor)) return;
    return this._rgbColor.g;
  }

  /**
   * Bの値をのみを返す
   * 設定した値が正しくない場合は undefined を返す
   *
   * @returns {number}
   */
  public getBlue(): number {
    if (isNullOrUndefined(this._rgbColor)) return;
    return this._rgbColor.b;
  }

  /**
   * 反対色を求める
   * option に 'HEX' 'Hex' 'hex' のどれかを指定された場合は HEX値の文字列 を返す
   * それ以外の場合は RGBのオブジェクト を返す
   *
   * @returns {{r: number; g: number; b: number}} | string
   */
  public getClashingColor(option: string = 'RGB'): { r: number, g: number, b: number } | string {
    if (isNullOrUndefined(this._rgbColor)) return;
    // 反対色の RgbColor を取得
    const clashingColor: RgbColor = convert.getClashingColorFrom(this._rgbColor);

    // option で HEX の指定がある場合HEX値を返す、それ以外の場合 RGBのオブジェクト を返す
    if (getColorTypeFrom(option) === ColorType.Hex) {
      return convert.rgbColorToHex(clashingColor);
    }
    return clashingColor.getObject();
  }

  /**
   * 補色を求める
   * option に 'HEX' 'Hex' 'hex' のどれかを指定された場合は HEX値の文字列 を返す
   * それ以外の場合は RGBのオブジェクト を返す
   *
   * @returns {{r: number; g: number; b: number}}
   */
  public getComplementaryColor(option: string = 'RGB'): { r: number, g: number, b: number } | string {
    if (isNullOrUndefined(this._rgbColor)) return;
    // 補色の RgbColor を取得
    const complementaryColor: RgbColor = convert.getComplementaryColorFrom(this._rgbColor);

    // option で HEX の指定がある場合HEX値を返す、それ以外の場合 RGBのオブジェクト を返す
    if (getColorTypeFrom(option) === ColorType.Hex) {
      return convert.rgbColorToHex(complementaryColor);
    }
    return complementaryColor.getObject();
  }

  /**
   * this._originalColor から this._rgbColor に値を設定する
   */
  private initSetting(): void {
    if (isRgb(this._originalColor)) this._rgbColor = convert.rgbToRgbColor(this._originalColor);
    if (isHex(this._originalColor)) this._rgbColor = convert.hexToRgbColor(this._originalColor);
  }
}
