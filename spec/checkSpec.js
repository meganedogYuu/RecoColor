const chai = require('chai');
const assert = chai.assert;
const check = require('../lib/check.js');

describe('isRgbのtest', () => {
  describe('isRgb 正常値のテスト', () => {
    const rgbes = [[255, 255, 255], [0, 255, 255], 'rgb(0, 255, 255)', 'RGB(0, 255, 255)', 'RGB(0,255,255)'];

    it(`isRgb test ${rgbes[0]}`, () => {
      assert.isTrue(check.isRgb(rgbes[0]))
    });
    it(`isRgb test ${rgbes[1]}`, () => {
      assert.isTrue(check.isRgb(rgbes[1]))
    });
    it(`isRgb test ${rgbes[2]}`, () => {
      assert.isTrue(check.isRgb(rgbes[2]))
    });
    it(`isRgb test ${rgbes[3]}`, () => {
      assert.isTrue(check.isRgb(rgbes[3]))
    });
    it(`isRgb test ${rgbes[4]}`, () => {
      assert.isTrue(check.isRgb(rgbes[4]))
    });
  });
  describe('isRgb 異常値のテスト', () => {
    const rgbes = [[0, 255, 255, 255], [-10, 255, 255], [255, 255,  256], 'rgb 255, 255, 255', 'rgb(255, 255, 255', 'rgb(255, 255, a)', 'rgb(255, 255, 255, 255)'];

    it(`isRgb test ${rgbes[0]}`, () => {
      assert.isFalse(check.isRgb(rgbes[0]))
    });
    it(`isRgb test ${rgbes[1]}`, () => {
      assert.isFalse(check.isRgb(rgbes[1]))
    });
    it(`isRgb test ${rgbes[2]}`, () => {
      assert.isFalse(check.isRgb(rgbes[2]))
    });
    it(`isRgb test ${rgbes[3]}`, () => {
      assert.isFalse(check.isRgb(rgbes[3]))
    });
    it(`isRgb test ${rgbes[4]}`, () => {
      assert.isFalse(check.isRgb(rgbes[4]))
    });
    it(`isRgb test ${rgbes[5]}`, () => {
      assert.isFalse(check.isRgb(rgbes[5]))
    });
  });
});

describe('isHexのtest', () => {
  describe('isHex 正常値のテスト', () => {
    const hexes = ['#fff000', '#fff', 'ffffff', 'fff'];

    it(`isHex test ${hexes[0]}`, () => {
      assert.isTrue(check.isHex(hexes[0]))
    });
    it(`isHex test ${hexes[1]}`, () => {
      assert.isTrue(check.isHex(hexes[1]))
    });
    it(`isHex test ${hexes[2]}`, () => {
      assert.isTrue(check.isHex(hexes[2]))
    });
  });
  describe('isHex 異常値のテスト', () => {
    const hexes = ['#ffff000', 'fffffff', '0g0', ''];

    it(`isHex test ${hexes[0]}`, () => {
      assert.isFalse(check.isHex(hexes[0]))
    });
    it(`isHex test ${hexes[1]}`, () => {
      assert.isFalse(check.isHex(hexes[1]))
    });
    it(`isHex test ${hexes[2]}`, () => {
      assert.isFalse(check.isHex(hexes[2]))
    });
    it(`isHex test ${hexes[3]}`, () => {
      assert.isFalse(check.isHex(hexes[3]))
    });
  });
});
