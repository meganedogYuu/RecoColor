const chai = require('chai');
const assert = chai.assert;
const recoColor = require('../index');

describe('RecoColor test', () => {
  /**
   * isRgb
   */
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


  /**
   * isHex
   */
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


  /**
   * isHsv
   */
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


  /**
   * getOriginal
   */
  describe('getOriginal test', () => {
    describe('最初に設定した値が取得出来るか', () => {
      const tests = ['#fff', '#000000', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', [0, 255, 255, 255], 'HSV(0, 100, 100)', {h: 100, s: 50, v:100}];

      tests.forEach((element, index) => {
        let color = new recoColor(element);
        it(`getOriginal of ${element}`, () => { assert.strictEqual(color.getOriginal(), tests[index]) });
      });
    });

    describe('set() で設定した値が取得出来るか', () => {
      const tests = ['#fff', '#000000', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', [0, 255, 255, 255], 'HSV(0, 100, 100)', {h: 100, s: 50, v:100}];

      tests.forEach((element, index) => {
        let color = new recoColor('ddd');
        color.set(tests[index]);
        it(`getOriginal of ${element}`, () => { assert.strictEqual(color.getOriginal(), tests[index]) });
      });
    });
  });


  /**
   * getType
   */
  describe('getType test', () => {
    describe('それぞれのTypeを "RGB", "HEX", "HSV", "none" の中から取得する', () => {
      const tests = ['#fff', '#000000', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(0, 255, 255)', 'RGB(0,255,255)', {r: 0, g: 0, b: 255}, 'hsv(360, 0, 0)', {h: 360, s: 0, v:0}, [0, 255, 255, 255], '$fff', '#ffg', null];
      const answers = ['HEX', 'HEX', 'HEX', 'HEX', 'RGB', 'RGB', 'RGB', 'RGB', 'RGB', 'HSV', 'HSV', 'none', 'none', 'none', 'none'];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`getType of ${element}`, () => { assert.strictEqual(color.getType(), answers[index]) });
      });
    });
  });


  /**
   * getHex
   */
  describe('getHex test', () => {
    describe('正常値の場合の HEX 値 を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}, 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = ['ffffff', 'aabbcc', '00f0ab', '000aff', '0078ff', 'b4145a', '140ab4', 'ff0000', '7a87f5'];

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


  /**
   * getRgb
   */
  describe('getRgb test', () => {
    describe('正常値の場合の RGBオブジェクト を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}, 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = [{r: 255, g: 255, b: 255}, {r: 170, g: 187, b: 204}, {r: 0, g: 240, b: 171}, {r: 0, g: 10, b: 255}, {r: 0, g: 120, b: 255}, {r: 180, g: 20, b: 90}, {r: 20, g: 10, b: 180}, {r: 255, g: 0, b: 0}, {r: 122, g: 135, b: 245}];

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


  /**
   * getRed
   */
  describe('getRed test', () => {
    describe('正常値の場合の Red の値 を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}, 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = [{r: 255, g: 255, b: 255}, {r: 170, g: 187, b: 204}, {r: 0, g: 240, b: 171}, {r: 0, g: 10, b: 255}, {r: 0, g: 120, b: 255}, {r: 180, g: 20, b: 90}, {r: 20, g: 10, b: 180}, {r: 255, g: 0, b: 0}, {r: 122, g: 135, b: 245}];

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


  /**
   * getGreen
   */
  describe('getGreen test', () => {
    describe('正常値の場合の Green の値 を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}, 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = [{r: 255, g: 255, b: 255}, {r: 170, g: 187, b: 204}, {r: 0, g: 240, b: 171}, {r: 0, g: 10, b: 255}, {r: 0, g: 120, b: 255}, {r: 180, g: 20, b: 90}, {r: 20, g: 10, b: 180}, {r: 255, g: 0, b: 0}, {r: 122, g: 135, b: 245}];

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


  /**
   * getBlue
   */
  describe('getBlue test', () => {
    describe('正常値の場合の Blue の値 を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}, 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = [{r: 255, g: 255, b: 255}, {r: 170, g: 187, b: 204}, {r: 0, g: 240, b: 171}, {r: 0, g: 10, b: 255}, {r: 0, g: 120, b: 255}, {r: 180, g: 20, b: 90}, {r: 20, g: 10, b: 180}, {r: 255, g: 0, b: 0}, {r: 122, g: 135, b: 245}];

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


  /**
   * getHsv
   */
  describe('getHsv test', () => {
    describe('正常値の場合の Blue の値 を取得する', () => {
      const tests = ['#fff', 'abc', '00f0ab', [0, 10, 255], 'rgb(0, 120, 255)', 'RGB(180, 20,90)', {r: 20, g: 10, b: 180}, 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = [{h: 0, s: 0, v: 100}, {h: 210, s: 17, v: 80}, {h: 163, s: 100, v: 94}, {h: 238, s: 100, v: 100}, {h: 212, s: 100, v: 100}, {h: 334, s: 89, v: 71}, {h: 244, s: 94, v: 71}, {h: 0, s: 100, v: 100}, {h: 234, s: 50, v: 96}];

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


  /**
   * getClashingColor
   */
  describe('getClashingColor test', () => {
    describe('正常値の場合の getClashingColor の値 を取得する（オプション指定なし）', () => {
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)', 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = [{r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255}, {r: 225, g: 245, b: 15}, {r: 55, g: 245, b: 254}, {r: 0, g: 255, b: 255}, {r: 133, g: 120, b: 10}];

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
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)', 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = ['000000', 'ffffff', 'e1f50f', '37f5fe', '00ffff', '85780a'];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getClashingColor is ${answers[index]}`, () => {
          assert.strictEqual(color.getClashingColor('HEX'), answers[index]);
        });
      });
    });

    describe('正常値の場合の getClashingColor の値 を取得する（オプション指定 失敗）', () => {
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)', 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = [{r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255}, {r: 225, g: 245, b: 15}, {r: 55, g: 245, b: 254}, {r: 0, g: 255, b: 255}, {r: 133, g: 120, b: 10}];

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
        it(`${element} getClashingColor is undefined`, () => { assert.strictEqual(color.getClashingColor(), undefined) });
      });
    });
  });


  /**
   * getComplementaryColor
   */
  describe('getComplementaryColor test', () => {
    describe('正常値の場合の getComplementaryColor の値 を取得する（オプション指定なし）', () => {
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)', 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = [{r: 255, g: 255, b: 255}, {r: 0, g: 0, b: 0}, {r: 220, g: 240, b: 10}, {r: 1, g: 191, b: 200}, {r: 0, g: 255, b: 255}, {r: 245, g: 233, b: 122}];

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
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)', 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = ['ffffff', '000000', 'dcf00a', '01bfc8', '00ffff', 'f5e97a'];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getComplementaryColor is ${answers[index]}`, () => {
          assert.strictEqual(color.getComplementaryColor('HEX'), answers[index]);
        });
      });
    });

    describe('正常値の場合の getComplementaryColor の値 を取得する（オプション指定 失敗）', () => {
      const tests = ['#fff', '000', [30, 10, 240], 'rgb(200, 10, 1)', 'HSV(0, 100, 100)', {h: 234, s: 50, v:96}];
      const answers = [{r: 255, g: 255, b: 255}, {r: 0, g: 0, b: 0}, {r: 220, g: 240, b: 10}, {r: 1, g: 191, b: 200}, {r: 0, g: 255, b: 255}, {r: 245, g: 233, b: 122}];

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
        it(`${element} getComplementaryColor is undefined`, () => { assert.strictEqual(color.getComplementaryColor(), undefined) });
      });
    });
  });


  /**
   * getTriad
   */
  describe('getTriad test', () => {
    describe('正常値の場合の getTriad の値 を取得する（オプション指定なし）', () => {
      const tests = ['#f00', 'rgb(200, 10, 1)', {h: 234, s: 50, v:96}];
      const answers = [[{r: 0, g: 255, b: 0}, {r: 0, g: 0, b: 255}], [ { r: 1, g: 200, b: 10 }, { r: 10, g: 1, b: 200 } ], [ { r: 245, g: 122, b: 135 }, { r: 135, g: 245, b: 122 } ]];

      tests.forEach((element, index) => {
        const color = new recoColor(tests[index]);
        const triad = color.getTriad();
        const answer = answers[index];
        triad.forEach((c, i) => {
          it(`${JSON.stringify(element)} getTriad element: ${i} is ${JSON.stringify(answer[i])}`, () => {
            assert.strictEqual(c.r, answer[i].r);
            assert.strictEqual(c.g, answer[i].g);
            assert.strictEqual(c.b, answer[i].b);
          });
        });
      });
    });

    describe('正常値の場合の getTriad の値 を取得する（hasOriginal: true）', () => {
      const tests = ['#f00', 'rgb(200, 10, 1)', {h: 234, s: 50, v:96}];
      const answers = [[{r: 255, g: 0, b: 0}, {r: 0, g: 255, b: 0}, {r: 0, g: 0, b: 255}], [ { r: 200, g: 10, b: 1 }, { r: 1, g: 200, b: 10 }, { r: 10, g: 1, b: 200 } ], [ { r: 122, g: 135, b: 245 }, { r: 245, g: 122, b: 135 }, { r: 135, g: 245, b: 122 } ]];

      tests.forEach((element, index) => {
        const color = new recoColor(tests[index]);
        const triad = color.getTriad({hasOriginal: true});
        const answer = answers[index];
        triad.forEach((c, i) => {
          it(`${JSON.stringify(element)} getTriad element: ${i} is ${JSON.stringify(answer[i])}`, () => {
            assert.strictEqual(c.r, answer[i].r);
            assert.strictEqual(c.g, answer[i].g);
            assert.strictEqual(c.b, answer[i].b);
          });
        });
      });
    });

    describe('正常値の場合の getTriad の値 を取得する（type: hex）', () => {
      const tests = ['#f00', 'rgb(200, 10, 1)', {h: 234, s: 50, v:96}];
      const answers = [['00ff00', '0000ff'], ['01c80a', '0a01c8'], ['f57a87', '87f57a']];

      tests.forEach((element, index) => {
        const color = new recoColor(tests[index]);
        const triad = color.getTriad({type: 'hex'});
        const answer = answers[index];
        triad.forEach((c, i) => {
          it(`${JSON.stringify(element)} getTriad element: ${i} is ${JSON.stringify(answer[i])}`, () => {
            assert.strictEqual(c, answer[i]);
          });
        });
      });
    });

    describe('正常値の場合の getTriad の値 を取得する（type: hsv）', () => {
      const tests = ['#f00', 'rgb(200, 10, 1)', {h: 234, s: 50, v:96}];
      const answers = [[{h: 120, s: 100, v: 100}, {h: 240, s: 100, v: 100}], [{h: 123, s: 100, v: 78}, {h: 243, s: 100, v: 78}], [{h: 354, s: 50, v: 96}, {h: 114, s: 50, v: 96}]];

      tests.forEach((element, index) => {
        const color = new recoColor(tests[index]);
        const triad = color.getTriad({type: 'hsv'});
        const answer = answers[index];
        triad.forEach((c, i) => {
          it(`${JSON.stringify(element)} getTriad element: ${i} is ${JSON.stringify(answer[i])}`, () => {
            assert.strictEqual(c.h, answer[i].h);
            assert.strictEqual(c.s, answer[i].s);
            assert.strictEqual(c.v, answer[i].v);
          });
        });
      });
    });

    describe('正常値の場合の getTriad の値 を取得する（hasOriginal, type両方指定）', () => {
      const tests = ['#f00', 'rgb(200, 10, 1)', {h: 234, s: 50, v:96}];
      const answers = [['ff0000', '00ff00', '0000ff'], ['c80a01', '01c80a', '0a01c8'], ['7a87f5', 'f57a87', '87f57a']];

      tests.forEach((element, index) => {
        const color = new recoColor(tests[index]);
        const triad = color.getTriad({hasOriginal:true, type: 'hex'});
        const answer = answers[index];
        triad.forEach((c, i) => {
          it(`${JSON.stringify(element)} getTriad element: ${i} is ${JSON.stringify(answer[i])}`, () => {
            assert.strictEqual(c, answer[i]);
          });
        });
      });
    });

    describe('異常値の場合は undefined を取得する', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', [0, 10, 255, 255], 'rgb(0, 120, 255, 0)', 'RGBA(180, 20, 90)', {r: 256, g: 10, b: 180}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getTriad is undefined`, () => { assert.strictEqual(color.getTriad(), undefined) });
      });
    });
  });


  /**
   * getTetrad
   */
  describe('getTetrad test', () => {
    describe('正常値の場合の getTetrad の値 を取得する（オプション指定なし）', () => {
      const tests = ['#f00', 'rgb(200, 10, 1)', {h: 234, s: 50, v:96}];
      const answers = [[{r: 128, g: 255, b: 0}, {r: 0, g: 255, b: 255}, {r: 128, g: 0, b: 255}], [{r: 92, g: 200, b: 1}, {r: 1, g: 191, b: 200}, {r: 110, g: 1, b: 200}], [{r: 245, g: 122, b: 196}, {r: 245, g: 233, b: 122}, {r: 122, g: 245, b: 171}]];

      tests.forEach((element, index) => {
        const color = new recoColor(tests[index]);
        const tetrad = color.getTetrad();
        const answer = answers[index];
        tetrad.forEach((c, i) => {
          it(`${JSON.stringify(element)} getTetrad element: ${i} is ${JSON.stringify(answer[i])}`, () => {
            assert.strictEqual(c.r, answer[i].r);
            assert.strictEqual(c.g, answer[i].g);
            assert.strictEqual(c.b, answer[i].b);
          });
        });
      });
    });

    describe('正常値の場合の getTetrad の値 を取得する（hasOriginal: true）', () => {
      const tests = ['#f00', 'rgb(200, 10, 1)', {h: 234, s: 50, v:96}];
      const answers = [[{r: 255, g: 0, b: 0}, {r: 128, g: 255, b: 0}, {r: 0, g: 255, b: 255}, {r: 128, g: 0, b: 255}], [{r: 200, g: 10, b: 1}, {r: 92, g: 200, b: 1}, {r: 1, g: 191, b: 200}, {r: 110, g: 1, b: 200}], [{r: 122, g: 135, b: 245}, {r: 245, g: 122, b: 196}, {r: 245, g: 233, b: 122}, {r: 122, g: 245, b: 171}]];

      tests.forEach((element, index) => {
        const color = new recoColor(tests[index]);
        const tetrad = color.getTetrad({hasOriginal: true});
        const answer = answers[index];
        tetrad.forEach((c, i) => {
          it(`${JSON.stringify(element)} getTetrad element: ${i} is ${JSON.stringify(answer[i])}`, () => {
            assert.strictEqual(c.r, answer[i].r);
            assert.strictEqual(c.g, answer[i].g);
            assert.strictEqual(c.b, answer[i].b);
          });
        });
      });
    });

    describe('正常値の場合の getTetrad の値 を取得する（type: hex）', () => {
      const tests = ['#f00', 'rgb(200, 10, 1)', {h: 234, s: 50, v:96}];
      const answers = [['80ff00', '00ffff', '8000ff'], ['5cc801', '01bfc8', '6e01c8'], ['f57ac4', 'f5e97a', '7af5ab']];

      tests.forEach((element, index) => {
        const color = new recoColor(tests[index]);
        const tetrad = color.getTetrad({type: 'hex'});
        const answer = answers[index];
        tetrad.forEach((c, i) => {
          it(`${JSON.stringify(element)} getTetrad element: ${i} is ${JSON.stringify(answer[i])}`, () => {
            assert.strictEqual(c, answer[i]);
          });
        });
      });
    });

    describe('正常値の場合の getTetrad の値 を取得する（type: hsv）', () => {
      const tests = ['#f00', 'rgb(200, 10, 1)', {h: 234, s: 50, v:96}];
      const answers = [[{h: 90, s: 100, v: 100}, {h: 180, s: 100, v: 100}, {h: 270, s: 100, v: 100}], [{h: 93, s: 100, v: 78}, {h: 183, s: 100, v: 78}, {h: 273, s: 100, v: 78}], [{h: 324, s: 50, v: 96}, {h: 54, s: 50, v: 96}, {h: 144, s: 50, v: 96}]];

      tests.forEach((element, index) => {
        const color = new recoColor(tests[index]);
        const tetrad = color.getTetrad({type: 'hsv'});
        const answer = answers[index];
        tetrad.forEach((c, i) => {
          it(`${JSON.stringify(element)} getTetrad element: ${i} is ${JSON.stringify(answer[i])}`, () => {
            assert.strictEqual(c.h, answer[i].h);
            assert.strictEqual(c.s, answer[i].s);
            assert.strictEqual(c.v, answer[i].v);
          });
        });
      });
    });

    describe('正常値の場合の getTetrad の値 を取得する（hasOriginal, type両方指定）', () => {
      const tests = ['#f00', 'rgb(200, 10, 1)', {h: 234, s: 50, v:96}];
      const answers = [['ff0000', '80ff00', '00ffff', '8000ff'], ['c80a01', '5cc801', '01bfc8', '6e01c8'], ['7a87f5', 'f57ac4', 'f5e97a', '7af5ab']];

      tests.forEach((element, index) => {
        const color = new recoColor(tests[index]);
        const tetrad = color.getTetrad({hasOriginal:true, type: 'hex'});
        const answer = answers[index];
        tetrad.forEach((c, i) => {
          it(`${JSON.stringify(element)} getTetrad element: ${i} is ${JSON.stringify(answer[i])}`, () => {
            assert.strictEqual(c, answer[i]);
          });
        });
      });
    });

    describe('異常値の場合は undefined を取得する', () => {
      const tests = ['#ffff', '#fffffff', '$fff', '#ffg', [0, 10, 255, 255], 'rgb(0, 120, 255, 0)', 'RGBA(180, 20, 90)', {r: 256, g: 10, b: 180}];

      tests.forEach((element, index) => {
        let color = new recoColor(tests[index]);
        it(`${element} getTetrad is undefined`, () => { assert.strictEqual(color.getTetrad(), undefined) });
      });
    });
  });
});