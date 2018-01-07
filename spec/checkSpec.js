const chai = require('chai');
const assert = chai.assert;
const check = require('../lib/check.js');

describe('isRgbのtest', () => {
  describe('isRgb 正常値のテスト', () => {
    const rgbes = [[255, 255, 255], [0, 255, 255], 'rgb(0, 255, 255)', 'RGB(0, 255, 255)', 'RGB(0,255,255)'];

    rgbes.forEach(e => {
      it(`isRgb test ${e}`, () => {
        assert.isTrue(check.isRgb(e))
      });
    });
  });
  describe('isRgb 異常値のテスト', () => {
    const rgbes = [[0, 255, 255, 255], [-10, 255, 255], [255, 255,  256], 'rgb 255, 255, 255', 'rgb(255, 255, 255', 'rgb(255, 255, a)', 'rgb(255, 255, 255, 255)'];

    rgbes.forEach(e => {
      it(`isRgb test ${e}`, () => {
        assert.isFalse(check.isRgb(e))
      });
    });
  });
});

describe('isHexのtest', () => {
  describe('isHex 正常値のテスト', () => {
    const hexes = ['#fff000', '#fff', 'ffffff', 'fff'];

    hexes.forEach(e => {
      it(`hexes test ${e}`, () => {
        assert.isTrue(check.isHex(e))
      });
    });
  });
  describe('isHex 異常値のテスト', () => {
    const hexes = ['#ffff000', 'fffffff', '0g0', ''];

    hexes.forEach(e => {
      it(`hexes test ${e}`, () => {
        assert.isFalse(check.isHex(e))
      });
    });
  });
});

describe('getTypeのtest', () => {
  describe('getType RGB のテスト', () => {
    const any = [[255, 255, 255], [0, 255, 255], 'rgb(0, 255, 255)', 'RGB(0, 255, 255)', 'RGB(0,255,255)'];
    const correct = 'RGB';

    any.forEach(e => {
      it(`${e} is ${correct}`, () => {
        assert.strictEqual(check.getType(e), correct)
      });
    });
  });

  describe('getType hex のテスト', () => {
    const any = ['#fff000', '#fff', 'ffffff', 'fff'];
    const correct = 'Hex';

    any.forEach(e => {
      it(`${e} is ${correct}`, () => {
        assert.strictEqual(check.getType(e), correct)
      });
    });
  });

  describe('getType none のテスト', () => {
    const any = [[0, 255, 255, 255], [-10, 255, 255], [255, 255,  256], '#ffff000', 'fffffff'];
    const correct = 'none';

    any.forEach(e => {
      it(`${e} is ${correct}`, () => {
        assert.strictEqual(check.getType(e), correct)
      });
    });
  });
});