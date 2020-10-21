//const chai = require('chai');
//const assert = chai.assert;
const check = require('../dist/utility/check.js')
const ColorType = require('../dist/member/ColorType.js')

describe('isRgb の test', () => {
  describe('isRgb 正常値のテスト', () => {
    const rgbes = [
      [255, 255, 255],
      [0, 255, 255],
      'rgb(0, 255, 255)',
      'RGB(0, 255, 255)',
      'RGB(0,255,255)',
      { r: 0, g: 0, b: 255 },
    ]

    rgbes.forEach(e => {
      it(`isRgb test ${e}`, () => {
        assert.isTrue(check.isRgb(e))
      })
    })
  })
  describe('isRgb 異常値のテスト', () => {
    const rgbes = [
      [0, 255, 255, 255],
      [-10, 255, 255],
      [255, 255, 256],
      'rgb 255, 255, 255',
      'rgb(255, 255, 255',
      'rgb(255, 255, a)',
      'rgb(255, 255, 255, 255)',
      '{r: 0, g:0, b:255}',
      { r: 0, g: 0, b: 256 },
      { r: -1, g: 0, b: 255 },
      { r: -1, g: 0, b: 'a' },
      null,
    ]

    rgbes.forEach(e => {
      it(`isRgb test ${e}`, () => {
        assert.isFalse(check.isRgb(e))
      })
    })
  })
})

describe('isHex の test', () => {
  describe('isHex 正常値のテスト', () => {
    const hexes = ['#fff000', '#fff', 'ffffff', 'fff']

    hexes.forEach(e => {
      it(`hexes test ${e}`, () => {
        assert.isTrue(check.isHex(e))
      })
    })
  })
  describe('isHex 異常値のテスト', () => {
    const hexes = ['#ffff000', 'fffffff', '0g0', '']

    hexes.forEach(e => {
      it(`hexes test ${e}`, () => {
        assert.isFalse(check.isHex(e))
      })
    })
  })
})

describe('isHsv の test', () => {
  describe('isHsv 正常値のテスト', () => {
    const hsvs = [
      'hsv(360, 0, 0)',
      'HSV(0, 100, 100)',
      { h: 360, s: 0, v: 0 },
      { h: 100, s: 50, v: 100 },
    ]

    hsvs.forEach(e => {
      it(`hsvs test ${e}`, () => {
        assert.isTrue(check.isHsv(e))
      })
    })
  })
  describe('isHsv 異常値のテスト', () => {
    const hsvs = [
      '#fff000',
      'rgb(255, 255, 255)',
      'hsl(360, 0, 0)',
      'hsv(361, 0, 0)',
      'hsv(360, -10, 0)',
      { h: 360, s: 0, r: 0 },
      { h: 400, s: 0, r: 0 },
    ]

    hsvs.forEach(e => {
      it(`hsvs test ${e}`, () => {
        assert.isFalse(check.isHsv(e))
      })
    })
  })
})

describe('getType の test', () => {
  describe('getType RGB のテスト', () => {
    const any = [
      [255, 255, 255],
      [0, 255, 255],
      'rgb(0, 255, 255)',
      'RGB(0, 255, 255)',
      'RGB(0,255,255)',
    ]
    const correct = 'RGB'

    any.forEach(e => {
      it(`${e} is ${correct}`, () => {
        assert.strictEqual(check.getType(e), correct)
      })
    })
  })

  describe('getType hex のテスト', () => {
    const any = ['#fff000', '#fff', 'ffffff', 'fff']
    const correct = 'HEX'

    any.forEach(e => {
      it(`${e} is ${correct}`, () => {
        assert.strictEqual(check.getType(e), correct)
      })
    })
  })

  describe('getType hsv のテスト', () => {
    const any = [
      'hsv(360, 0, 0)',
      'HSV(0, 100, 100)',
      { h: 360, s: 0, v: 0 },
      { h: 100, s: 50, v: 100 },
    ]
    const correct = 'HSV'

    any.forEach(e => {
      it(`${e} is ${correct}`, () => {
        assert.strictEqual(check.getType(e), correct)
      })
    })
  })

  describe('getType none のテスト', () => {
    const any = [[0, 255, 255, 255], [-10, 255, 255], [255, 255, 256], '#ffff000', 'fffffff']
    const correct = 'none'

    any.forEach(e => {
      it(`${e} is ${correct}`, () => {
        assert.strictEqual(check.getType(e), correct)
      })
    })
  })
})

describe('getColorTypeFrom の test', () => {
  describe('getColorTypeFrom HEX のテスト', () => {
    const any = ['HEX', 'Hex', 'hex', 'hex  ', '  hex']

    any.forEach(e => {
      it(`${e} is HEX`, () => {
        assert.strictEqual(check.getColorTypeFrom(e), ColorType.ColorType.Hex)
      })
    })
  })

  describe('getColorTypeFrom HSV のテスト', () => {
    const any = ['HSV', 'Hsv', 'hsv', 'hsv  ', '  hsv']

    any.forEach(e => {
      it(`${e} is HSV`, () => {
        assert.strictEqual(check.getColorTypeFrom(e), ColorType.ColorType.Hsv)
      })
    })
  })

  describe('getColorTypeFrom RGB のテスト', () => {
    const any = ['RGB', 'Rgb', 'rgb', 'rgb  ', '  rgb']

    any.forEach(e => {
      it(`${e} is RGB`, () => {
        assert.strictEqual(check.getColorTypeFrom(e), ColorType.ColorType.Rgb)
      })
    })
  })

  describe('getColorTypeFrom 不正値 のテスト', () => {
    const any = ['Rgg', 'hez', 'Hsz', 'aaa', 'hs v', '', null, undefined]

    any.forEach(e => {
      it(`${e} is undefined`, () => {
        assert.strictEqual(check.getColorTypeFrom(e), undefined)
      })
    })
  })
})
