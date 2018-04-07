const chai = require('chai');
const assert = chai.assert;
const recoColor = require('../index');

describe('RecoColor test', () => {
  describe('isRgb test', () => {
    describe('isRgb true の場合のテスト', () => {
      const tests = [[0, 10, 255], 'rgb(0, 120, 255)', 'RGB(0, 255, 255)', 'RGB(0,255,255)', {r: 0, g: 0, b: 255}];

      tests.forEach((element) => {
        let color = new recoColor(element);
        it(`${element} isRgb true`, () => { assert.isTrue(color.isRgb()) });
      });
    });

    describe('isRgb false の場合のテスト', () => {
      const tests = [[0, 255, 255, 255], [-10, 255, 255], [255, 255,  256], 'rgb 255, 255, 255', 'rgb(255, 255, 255', 'rgb(255, 255, a)', 'rgb(255, 255, 255, 255)', '{r: 0, g:0, b:255}', {r: 0, g:0, b:256}, {r: -1, g:0, b:255}, {r: -1, g:0, b:"a"}, "#fff", "#fff000", null];

      tests.forEach((element) => {
        let color = new recoColor(element);
        it(`${element} isRgb false`, () => { assert.isFalse(color.isRgb()) });
      });
    });
  });

  describe('isHex test', () => {
    describe('isHex true の場合のテスト', () => {
      const tests = ['#fff', '#000000', 'abc', '00f0ab'];

      tests.forEach((element) => {
        let color = new recoColor(element);
        it(`${element} isHex true`, () => { assert.isTrue(color.isHex()) });
      });
    });

    describe('isHex false の場合のテスト', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', 'null', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(0, 255, 255)', null];

      tests.forEach((element) => {
        let color = new recoColor(element);
        it(`${element} isHex false`, () => { assert.isFalse(color.isHex()) });
      });
    });
  });

  describe('isHsv の test', () => {
    describe('isHsv true の場合のテスト', () => {
      const tests = ['hsv(360, 0, 0)', 'HSV(0, 100, 100)', {h: 360, s: 0, v:0}, {h: 100, s: 50, v:100}];

      tests.forEach(element => {
        let color = new recoColor(element);
        it(`${element} isHsv true`, () => { assert.isTrue(color.isHsv()) });
      });
    });
    describe('isHsv false の場合のテスト', () => {
      const tests = ['#fff000', 'rgb(255, 255, 255)', 'hsl(360, 0, 0)', 'hsv(361, 0, 0)', 'hsv(360, -10, 0)', {h: 360, s: 0, r:0}, {h: 400, s: 0, r:0}, [0, 120, 255] , null];

      tests.forEach(element => {
        let color = new recoColor(element);
        it(`${element} isHsv false`, () => { assert.isFalse(color.isHsv()) });
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
    describe('正常値の場合の HEX 値 を取得する', () => {
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
    describe('正常値の場合の Red の値 を取得する', () => {
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
    describe('正常値の場合の Green の値 を取得する', () => {
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
    describe('正常値の場合の Blue の値 を取得する', () => {
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

  describe('getHsv test', () => {
    describe('正常値の場合の Blue の値 を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}];
      const answers = [{h: 0, s: 0, v: 100}, {h: 210, s: 17, v: 80}, {h: 163, s: 100, v: 94}, {h: 238, s: 100, v: 100}, {h: 212, s: 100, v: 100}, {h: 334, s: 89, v: 71}, {h: 244, s: 94, v: 71}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} hsv is h: ${answers[index].h}, s: ${answers[index].s}, v: ${answers[index].v}`, () => {
          assert.strictEqual(color.getHsv().h, answers[index].h);
          assert.strictEqual(color.getHsv().s, answers[index].s);
          assert.strictEqual(color.getHsv().v, answers[index].v);
        });
      });
    });

    describe('異常値の場合は undefined を取得する', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', [0, 10, 255, 255], 'rgb(0, 120, 255, 0)', 'RGBA(180, 20, 90)', {r: 256, g: 10, b: 180}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} hsv is undefined`, () => { assert.strictEqual(color.getHsv(), undefined) });
      });
    });
  });

  describe('getClashingColor test', () => {
    describe('正常値の場合の getClashingColor の値 を取得する（オプション指定なし）', () => {
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)'];
      const answers = [{r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255}, {r: 225, g: 245, b: 15}, {r: 55, g: 245, b: 254}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getClashingColor is r: ${answers[index].r} g: ${answers[index].g} b: ${answers[index].b}`, () => {
          assert.strictEqual(color.getClashingColor().r, answers[index].r);
          assert.strictEqual(color.getClashingColor().g, answers[index].g);
          assert.strictEqual(color.getClashingColor().b, answers[index].b);
        });
      });
    });

    describe('正常値の場合の getClashingColor の値 を取得する（オプション指定 hex）', () => {
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)'];
      const answers = ['000000', 'ffffff', 'e1f50f', '37f5fe'];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getClashingColor is ${answers[index]}`, () => {
          assert.strictEqual(color.getClashingColor('HEX'), answers[index]);
        });
      });
    });

    describe('正常値の場合の getClashingColor の値 を取得する（オプション指定 失敗）', () => {
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)'];
      const answers = [{r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255}, {r: 225, g: 245, b: 15}, {r: 55, g: 245, b: 254}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getClashingColor is r: ${answers[index].r} g: ${answers[index].g} b: ${answers[index].b}`, () => {
          assert.strictEqual(color.getClashingColor('Hez').r, answers[index].r);
          assert.strictEqual(color.getClashingColor('Hez').g, answers[index].g);
          assert.strictEqual(color.getClashingColor('Hez').b, answers[index].b);
        });
      });
    });

    describe('異常値の場合は undefined を取得する', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', [0, 10, 255, 255], 'rgb(0, 120, 255, 0)', 'RGBA(180, 20, 90)', {r: 256, g: 10, b: 180}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getClashingColor is undefined`, () => { assert.strictEqual(color.getBlue(), undefined) });
      });
    });
  });

  describe('getComplementaryColor test', () => {
    describe('正常値の場合の getComplementaryColor の値 を取得する（オプション指定なし）', () => {
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)'];
      const answers = [{r: 255, g: 255, b: 255}, {r: 0, g: 0, b: 0}, {r: 220, g: 240, b: 10}, {r: 1, g: 191, b: 200}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getComplementaryColor is r: ${answers[index].r} g: ${answers[index].g} b: ${answers[index].b}`, () => {
          assert.strictEqual(color.getComplementaryColor().r, answers[index].r);
          assert.strictEqual(color.getComplementaryColor().g, answers[index].g);
          assert.strictEqual(color.getComplementaryColor().b, answers[index].b);
        });
      });
    });

    describe('正常値の場合の getComplementaryColor の値 を取得する（オプション指定 hex）', () => {
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)'];
      const answers = ['ffffff', '000000', 'dcf00a', '01bfc8'];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getComplementaryColor is ${answers[index]}`, () => {
          assert.strictEqual(color.getComplementaryColor('HEX'), answers[index]);
        });
      });
    });

    describe('正常値の場合の getComplementaryColor の値 を取得する（オプション指定 失敗）', () => {
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)'];
      const answers = [{r: 255, g: 255, b: 255}, {r: 0, g: 0, b: 0}, {r: 220, g: 240, b: 10}, {r: 1, g: 191, b: 200}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getComplementaryColor is r: ${answers[index].r} g: ${answers[index].g} b: ${answers[index].b}`, () => {
          assert.strictEqual(color.getComplementaryColor().r, answers[index].r);
          assert.strictEqual(color.getComplementaryColor().g, answers[index].g);
          assert.strictEqual(color.getComplementaryColor().b, answers[index].b);
        });
      });
    });

    describe('異常値の場合は undefined を取得する', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', [0, 10, 255, 255], 'rgb(0, 120, 255, 0)', 'RGBA(180, 20, 90)', {r: 256, g: 10, b: 180}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getClashingColor is undefined`, () => { assert.strictEqual(color.getBlue(), undefined) });
      });
    });
  });
});