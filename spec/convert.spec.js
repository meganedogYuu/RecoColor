const chai = require('chai');
const assert = chai.assert;
const convert = require('../lib/utility/convert.js');
const rgbColor = require('../lib/member/RgbColor');

describe('rgbToRgbColor の test', () => {
  describe('rgbToRgbColor 正常値のテスト', () => {
    const rgbes = [[0, 10, 255], 'rgb(0, 120, 255)', 'RGB(0, 255, 255)', 'RGB(0,255,255)', {r: 0, g:0, b:255}];
    const answers = [{r:0, g:10, b:255}, {r:0, g:120, b:255}, {r:0, g:255, b:255}, {r:0, g:255, b:255}, {r:0, g:0, b:255}];

    rgbes.forEach((element, index) => {
      it(`convert ${element} to RgbColor`, () => {
        const result = convert.rgbToRgbColor(element);
        const answer = new rgbColor.RgbColor(answers[index]);
        assert.strictEqual(result.r, answer.r);
        assert.strictEqual(result.g, answer.g);
        assert.strictEqual(result.b, answer.b);
      });
    });
  });
  describe('rgbToRgbColor 異常値のテスト', () => {
    const rgbes = [[0, 255, 255, 255], [-10, 255, 255], [255, 255,  256], 'rgb 255, 255, 255', 'rgb(255, 255, 255', 'rgb(255, 255, a)', 'rgb(255, 255, 255, 255)', '{r: 0, g:0, b:255}', {r: 0, g:0, b:256}, {r: -1, g:0, b:255}, {r: -1, g:0, b:"a"}, null];

    rgbes.forEach((element, index) => {
      it(`convert ${element} to RgbColor`, () => {
        const result = convert.rgbToRgbColor(element);
        assert.strictEqual(result, undefined);
      });
    });
  });
});


describe('hexToRgbColor の test', () => {
  describe('hexToRgbColor 正常値のテスト', () => {
    const rgbes = ['#fff', '#000000', 'abc', '00f0ab'];
    const answers = [{r:255, g:255, b:255}, {r:0, g:0, b:0}, {r:170, g:187, b:204}, {r:0, g:240, b:171}];

    rgbes.forEach((element, index) => {
      it(`convert ${element} to hexToRgbColor`, () => {
        const result = convert.hexToRgbColor(element);
        const answer = new rgbColor.RgbColor(answers[index]);
        assert.strictEqual(result.r, answer.r);
        assert.strictEqual(result.g, answer.g);
        assert.strictEqual(result.b, answer.b);
      });
    });
  });
  describe('hexToRgbColor 異常値のテスト', () => {
    const rgbes = ['#ffff', '#fffffff', '$fff', '#ffg', 'null', null];

    rgbes.forEach((element, index) => {
      it(`convert ${element} to RgbColor`, () => {
        const result = convert.rgbToRgbColor(element);
        assert.strictEqual(result, undefined);
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