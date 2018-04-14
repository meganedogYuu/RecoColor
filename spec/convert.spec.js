const chai = require('chai');
const assert = chai.assert;
const convert = require('../lib/utility/convert.js');
const rgbColor = require('../lib/member/RgbColor');

describe('rgbToRgbObject の test', () => {
  describe('rgbToRgbObject 正常値のテスト', () => {
    const rgbes = [[0, 10, 255], 'rgb(0, 120, 255)', 'RGB(0, 255, 255)', 'RGB(0,255,255)', {r: 0, g:0, b:255}];
    const answers = [{r:0, g:10, b:255}, {r:0, g:120, b:255}, {r:0, g:255, b:255}, {r:0, g:255, b:255}, {r:0, g:0, b:255}];

    rgbes.forEach((element, index) => {
      it(`convert ${element} to RgbObject`, () => {
        const result = convert.rgbToRgbObject(element);
        assert.strictEqual(result.r, answers[index].r);
        assert.strictEqual(result.g, answers[index].g);
        assert.strictEqual(result.b, answers[index].b);
      });
    });
  });
  describe('rgbToRgbObject 異常値のテスト', () => {
    const rgbes = [[0, 255, 255, 255], [-10, 255, 255], [255, 255,  256], 'rgb 255, 255, 255', 'rgb(255, 255, 255', 'rgb(255, 255, a)', 'rgb(255, 255, 255, 255)', '{r: 0, g:0, b:255}', {r: 0, g:0, b:256}, {r: -1, g:0, b:255}, {r: -1, g:0, b:"a"}, null];

    rgbes.forEach((element, index) => {
      it(`convert ${element} to RgbObject`, () => {
        const result = convert.rgbToRgbObject(element);
        assert.strictEqual(result, undefined);
      });
    });
  });
});


describe('hexToRgbObject の test', () => {
  describe('hexToRgbObject 正常値のテスト', () => {
    const rgbes = ['#fff', '#000000', 'abc', '00f0ab'];
    const answers = [{r:255, g:255, b:255}, {r:0, g:0, b:0}, {r:170, g:187, b:204}, {r:0, g:240, b:171}];

    rgbes.forEach((element, index) => {
      it(`convert ${element} to RgbObject`, () => {
        const result = convert.hexToRgbObject(element);
        assert.strictEqual(result.r, answers[index].r);
        assert.strictEqual(result.g, answers[index].g);
        assert.strictEqual(result.b, answers[index].b);
      });
    });
  });
  describe('hexToRgbObject 異常値のテスト', () => {
    const rgbes = ['#ffff', '#fffffff', '$fff', '#ffg', 'null', null];

    rgbes.forEach((element, index) => {
      it(`convert ${element} to RgbObject`, () => {
        const result = convert.hexToRgbObject(element);
        assert.strictEqual(result, undefined);
      });
    });
  });
});

describe('hsvToRgbObject の test', () => {
  describe('hsvToRgbObject 正常値のテスト', () => {
    const hsvs = ["hsv(300, 20, 10)", "HSV(30, 100, 80)", {h:240, s: 20, v: 80}];
    const answers = [{r:26, g:20, b:26}, {r:204, g:102, b:0}, {r:163, g:163, b:204}];

    hsvs.forEach((element, index) => {
      it(`convert ${element} to RgbObject`, () => {
        const result = convert.hsvToRgbObject(element);
        assert.strictEqual(Math.round(result.r), answers[index].r);
        assert.strictEqual(Math.round(result.g), answers[index].g);
        assert.strictEqual(Math.round(result.b), answers[index].b);
      });
    });
  });
  describe('hsvToRgbObject 異常値のテスト', () => {
    const hsvs = ["hsv(370, 20, 10)", "HSS(30, 100, 80)", {h:240, a: 20, v: 80}, {h:361, s: 20, v: 80}, {h:361, s: 20, v: -1}];

    hsvs.forEach(element => {
      it(`convert ${element} to RgbObject`, () => {
        const result = convert.hsvToRgbObject(element);
        assert.strictEqual(result, undefined);
      });
    });
  });
});

describe('rgbObjectToHsvObject の test', () => {
  describe('rgbObjectToHsvObject 正常値のテスト', () => {
    const rgbes = [{r:255, g:255, b:255}, {r:0, g:0, b:0}, {r:170, g:187, b:204}, {r:0, g:240, b:171}];
    const answers = [{h:0, s:0, v:100}, {h:0, s:0, v:0}, {h:210, s:16, v:80}, {h:162, s:100, v:94}];

    rgbes.forEach((element, index) => {
      it(`convert r:${element.r}, g:${element.g}, b:${element.b} to Hsv`, () => {
        const result = convert.rgbObjectToHsvObject(element);
        // rgbColorToHsv は小数点に処理をせずに取得する
        // その状態のままだと比較がしづらいため切り捨てを行う
        assert.strictEqual(Math.floor(result.h), answers[index].h);
        assert.strictEqual(Math.floor(result.s), answers[index].s);
        assert.strictEqual(Math.floor(result.v), answers[index].v);
      });
    });
  });
});

describe('rgbObjectToHexString の test', () => {
  describe('rgbObjectToHexString 正常値のテスト', () => {
    const rgbes = [{r:255, g:255, b:255}, {r:0, g:0, b:0}, {r:170, g:187, b:204}, {r:0, g:240, b:171}];
    const answers = ['ffffff', '000000', 'aabbcc', '00f0ab'];

    rgbes.forEach((element, index) => {
      it(`convert r:${element.r}, g:${element.g}, b:${element.b} to hex`, () => {
        const result = convert.rgbObjectToHexString(element);
        assert.strictEqual(result, answers[index]);
      });
    });
  });
});


describe('getClashingColorFrom の test', () => {
  describe('getClashingColorFrom 正常値のテスト', () => {
    const colors = [{r:255, g:255, b:255}, {r:0, g:0, b:0}, {r:170, g:187, b:204}, {r:0, g:240, b:171}];
    const answers = [{r:0, g:0, b:0}, {r:255, g:255, b:255}, {r:85, g:68, b:51}, {r:255, g:15, b:84}];

    colors.forEach((element, index) => {
      it(`convert ${element} to clashing color`, () => {
        const color = new rgbColor.RgbColor(element);
        const result = convert.getClashingColorFrom(color);
        const answer = new rgbColor.RgbColor(answers[index]);
        assert.strictEqual(result.r, answer.r);
        assert.strictEqual(result.g, answer.g);
        assert.strictEqual(result.b, answer.b);
      });
    });
  });
});


describe('getComplementaryColorFrom の test', () => {
  describe('getComplementaryColorFrom 正常値のテスト', () => {
    const colors = [{r:255, g:255, b:255}, {r:0, g:0, b:0}, {r:170, g:187, b:204}, {r:20, g:80, b:100}];
    const answers = [{r:255, g:255, b:255}, {r:0, g:0, b:0}, {r:204, g:187, b:170}, {r:100, g:40, b:20}];

    colors.forEach((element, index) => {
      it(`convert ${element} to complementary color`, () => {
        const color = new rgbColor.RgbColor(element);
        const result = convert.getComplementaryColorFrom(color);
        const answer = new rgbColor.RgbColor(answers[index]);
        assert.strictEqual(result.r, answer.r);
        assert.strictEqual(result.g, answer.g);
        assert.strictEqual(result.b, answer.b);
      });
    });
  });
});