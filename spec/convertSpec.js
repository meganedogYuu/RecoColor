const chai = require('chai');
const assert = chai.assert;
const convert = require('../lib/convert.js');
const rgbColor = require('../lib/Class/RgbColor');

describe('rgbToRgbColorのtest', () => {
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
    const answer = new rgbColor.RgbColor({r:0, g:0, b:0});

    rgbes.forEach((element, index) => {
      it(`convert ${element} to RgbColor`, () => {
        const result = convert.rgbToRgbColor(element);
        assert.strictEqual(result.r, answer.r);
        assert.strictEqual(result.g, answer.g);
        assert.strictEqual(result.b, answer.b);
      });
    });
  });
});


describe('hexToRgbColorのtest', () => {
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
    const answer = new rgbColor.RgbColor({r:0, g:0, b:0});

    rgbes.forEach((element, index) => {
      it(`convert ${element} to RgbColor`, () => {
        const result = convert.rgbToRgbColor(element);
        assert.strictEqual(result.r, answer.r);
        assert.strictEqual(result.g, answer.g);
        assert.strictEqual(result.b, answer.b);
      });
    });
  });
});