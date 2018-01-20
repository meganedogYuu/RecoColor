const chai = require('chai');
const assert = chai.assert;
const recoColor = require('../index');

describe('RecoColor test', () => {
  describe('isRgb test', () => {
    describe('isRgb trueの場合のテスト', () => {
      const tests = [[0, 10, 255], 'rgb(0, 120, 255)', 'RGB(0, 255, 255)', 'RGB(0,255,255)', {r: 0, g: 0, b: 255}];

      tests.forEach((element) => {
        let color = new recoColor(element);
        it(`${element} isRgb true`, () => { assert.isTrue(color.isRgb()) });
      });
    });

    describe('isRgb falseの場合のテスト', () => {
      const tests = [[0, 255, 255, 255], [-10, 255, 255], [255, 255,  256], 'rgb 255, 255, 255', 'rgb(255, 255, 255', 'rgb(255, 255, a)', 'rgb(255, 255, 255, 255)', '{r: 0, g:0, b:255}', {r: 0, g:0, b:256}, {r: -1, g:0, b:255}, {r: -1, g:0, b:"a"}, "#fff", "#fff000", null];

      tests.forEach((element) => {
        let color = new recoColor(element);
        it(`${element} isRgb false`, () => { assert.isFalse(color.isRgb()) });
      });
    });
  });

  describe('isHex test', () => {
    describe('isHex trueの場合のテスト', () => {
      const tests = ['#fff', '#000000', 'abc', '00f0ab'];

      tests.forEach((element) => {
        let color = new recoColor(element);
        it(`${element} isHex true`, () => { assert.isTrue(color.isHex()) });
      });
    });

    describe('isHex falseの場合のテスト', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', 'null', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(0, 255, 255)', null];

      tests.forEach((element) => {
        let color = new recoColor(element);
        it(`${element} isHex false`, () => { assert.isFalse(color.isHex()) });
      });
    });
  });

  describe('getOriginal test', () => {
    describe('最初に設定した値が取得出来るか', () => {
      const tests = ['#fff', '#000000', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', [0, 255, 255, 255]];

      tests.forEach((element, index) => {
        let color = new recoColor(element);
        it(`getOriginal of ${element}`, () => { assert.strictEqual(color.getOriginal(), tests[index]) });
      });
    });

    describe('set() で設定した値が取得出来るか', () => {
      const tests = ['#fff', '#000000', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', [0, 255, 255, 255]];

      tests.forEach((element, index) => {
        let color = new recoColor('ddd');
        color.set(tests[index]);
        it(`getOriginal of ${element}`, () => { assert.strictEqual(color.getOriginal(), tests[index]) });
      });
    });
  });

  describe('getType test', () => {
    describe('それぞれのTypeを "RGB", "HEX", "none" の中から取得する', () => {
      const tests = ['#fff', '#000000', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(0, 255, 255)', 'RGB(0,255,255)', {r: 0, g: 0, b: 255}, [0, 255, 255, 255], '$fff', '#ffg', null];
      const answers = ['HEX', 'HEX', 'HEX', 'HEX', 'RGB', 'RGB', 'RGB', 'RGB', 'RGB', 'none', 'none', 'none', 'none'];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`getType of ${element}`, () => { assert.strictEqual(color.getType(), answers[index]) });
      });
    });
  });

  describe('getHex test', () => {
    describe('正常値の場合の HEX値 を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}];
      const answers = ['ffffff', 'aabbcc', '00f0ab', '000aff', '0078ff', 'b4145a', '140ab4'];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} hex is ${answers[index]}`, () => { assert.strictEqual(color.getHex(), answers[index]) });
      });
    });

    describe('異常値の場合は undefined を取得する', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', [0, 10, 255, 255], 'rgb(0, 120, 255, 0)', 'RGBA(180, 20, 90)', {r: 256, g: 10, b: 180}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} hex is undefined`, () => { assert.strictEqual(color.getHex(), undefined) });
      });
    });
  });

  describe('getRgb test', () => {
    describe('正常値の場合の RGBオブジェクト を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}];
      const answers = [{r: 255, g: 255, b: 255}, {r: 170, g: 187, b: 204}, {r: 0, g: 240, b: 171}, {r: 0, g: 10, b: 255}, {r: 0, g: 120, b: 255}, {r: 180, g: 20, b: 90}, {r: 20, g: 10, b: 180},];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} RGB Object is ${answers[index]}`, () => {
          assert.strictEqual(color.getRgb().r, answers[index].r);
          assert.strictEqual(color.getRgb().g, answers[index].g);
          assert.strictEqual(color.getRgb().b, answers[index].b);
        });
      });
    });

    describe('異常値の場合は undefined を取得する', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', [0, 10, 255, 255], 'rgb(0, 120, 255, 0)', 'RGBA(180, 20, 90)', {r: 256, g: 10, b: 180}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} RGB Object is undefined`, () => { assert.strictEqual(color.getRgb(), undefined) });
      });
    });
  });

  describe('getRed test', () => {
    describe('正常値の場合の Redの値 を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}];
      const answers = [{r: 255, g: 255, b: 255}, {r: 170, g: 187, b: 204}, {r: 0, g: 240, b: 171}, {r: 0, g: 10, b: 255}, {r: 0, g: 120, b: 255}, {r: 180, g: 20, b: 90}, {r: 20, g: 10, b: 180},];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} red is ${answers[index].r}`, () => {
          assert.strictEqual(color.getRed(), answers[index].r);
        });
      });
    });

    describe('異常値の場合は undefined を取得する', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', [0, 10, 255, 255], 'rgb(0, 120, 255, 0)', 'RGBA(180, 20, 90)', {r: 256, g: 10, b: 180}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} red is undefined`, () => { assert.strictEqual(color.getRgb(), undefined) });
      });
    });
  });

  describe('getGreen test', () => {
    describe('正常値の場合の Greenの値 を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}];
      const answers = [{r: 255, g: 255, b: 255}, {r: 170, g: 187, b: 204}, {r: 0, g: 240, b: 171}, {r: 0, g: 10, b: 255}, {r: 0, g: 120, b: 255}, {r: 180, g: 20, b: 90}, {r: 20, g: 10, b: 180},];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} green is ${answers[index].g}`, () => {
          assert.strictEqual(color.getGreen(), answers[index].g);
        });
      });
    });

    describe('異常値の場合は undefined を取得する', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', [0, 10, 255, 255], 'rgb(0, 120, 255, 0)', 'RGBA(180, 20, 90)', {r: 256, g: 10, b: 180}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} green is undefined`, () => { assert.strictEqual(color.getGreen(), undefined) });
      });
    });
  });

  describe('getBlue test', () => {
    describe('正常値の場合の Blueの値 を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}];
      const answers = [{r: 255, g: 255, b: 255}, {r: 170, g: 187, b: 204}, {r: 0, g: 240, b: 171}, {r: 0, g: 10, b: 255}, {r: 0, g: 120, b: 255}, {r: 180, g: 20, b: 90}, {r: 20, g: 10, b: 180},];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} blue is ${answers[index].b}`, () => {
          assert.strictEqual(color.getBlue(), answers[index].b);
        });
      });
    });

    describe('異常値の場合は undefined を取得する', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', [0, 10, 255, 255], 'rgb(0, 120, 255, 0)', 'RGBA(180, 20, 90)', {r: 256, g: 10, b: 180}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} blue is undefined`, () => { assert.strictEqual(color.getBlue(), undefined) });
      });
    });
  });
});