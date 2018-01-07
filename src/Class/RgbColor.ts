export class RgbColor {
  private _r: number;
  private _g: number;
  private _b: number;

  private minNum: number = 0;
  private maxNum: number = 255;

  constructor(obj: { r: number, g: number, b: number }) {
    this._r = obj.r;
    this._g = obj.g;
    this._b = obj.b;
  }

  get r(): number {
    return this.getRgbNum(this._r);
  }

  get g(): number {
    return this.getRgbNum(this._g);
  }

  get b(): number {
    return this.getRgbNum(this._b);
  }

  private getRgbNum(num: number): number {
    if (num < this.minNum) return this.minNum;
    if (num > this.maxNum) return this.maxNum;
    return num;
  }
}
