const chai = require('chai');
const assert = chai.assert;
const check = require('../lib/check.js');

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