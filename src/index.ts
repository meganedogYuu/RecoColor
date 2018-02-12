import { isRgb, isHex, getType } from './utility/check';
import { rgbToRgbColor, hexToRgbColor, rgbColorToHex } from './utility/convert';
import { isNullOrUndefined } from './utility/util';
import { RgbColor } from './member/RgbColor';


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
    return rgbColorToHex(this._rgbColor);
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
   * this._originalColor から this._rgbColor に値を設定する
   */
  private initSetting(): void {
    if (isRgb(this._originalColor)) this._rgbColor = rgbToRgbColor(this._originalColor);
    if (isHex(this._originalColor)) this._rgbColor = hexToRgbColor(this._originalColor);
  }
}
