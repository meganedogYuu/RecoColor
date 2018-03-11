# RecoColor [![Build Status](https://travis-ci.org/meganedogYuu/recoColor.svg?branch=master)](https://travis-ci.org/meganedogYuu/recoColor)

色の変換・確認を行うライブラリ

## インストール

```bash
npm install recocolor
```

```javascript
const RecoColor = require("recocolor");
const color = new RecoColor("#fff");
```

## 使い方

### 色の設定

#### RGB

- 配列、文字列、オブジェクト型に対応

```javascript
const color = new RecoColor([0, 10, 255]);
const color = new RecoColor("rgb(0, 120, 255)");
const color = new RecoColor("RGB(0, 255, 255)");
const color = new RecoColor("RGB(0,255,255)");
const color = new RecoColor({r: 0, g: 0, b: 255});

const color = new RecoColor();
color.set([0, 10, 255]);

const color = new RecoColor();
color.set("rgb(0, 120, 255)");

const color = new RecoColor();
color.set("RGB(0, 255, 255)");

const color = new RecoColor();
color.set("RGB(0,255,255)");

const color = new RecoColor();
color.set({r: 0, g: 0, b: 255});
```


#### Hex

- 3ケタ or 6ケタ
- `0~f` （大文字小文字どちらでもOK）
- `#` が先頭にあるないものどちらでもOK

```javascript
const color = new RecoColor("#fff");
const color = new RecoColor("#000000");
const color = new RecoColor("ABC");
const color = new RecoColor("00f0ab");

const color = new RecoColor();
color.set("#fff");

const color = new RecoColor();
color.set("#000000");

const color = new RecoColor();
color.set("ABC");

const color = new RecoColor();
color.set("00f0ab");
```


### メソッド

#### getOriginal

インスタンス化・`set()`で設定した値を取得  
（誤った値の場合でも取得できます）

```javascript
const color = new RecoColor("#fff");
color.getOriginal();  // "#fff"

const color = new RecoColor([0, 10, 255]);
color.getOriginal();  // [0, 10, 255]

const color = new RecoColor("1234567");
color.getOriginal();  // "1234567" => 誤った値でも取得可能 
```

#### getType

設定した色のタイプを "RGB", "HEX", "none" の中から取得  
（`RecoColor`で判定が出来ない値の場合は全て "none" になります）

```javascript
const color = new RecoColor([0, 10, 255]);
color.getType();  // "RGB"

const color = new RecoColor("#fff");
color.getType();  // "HEX"

const color = new RecoColor("1234567");
color.getOriginal();  // "none"
```

#### getRgb

RGB値で表した場合の値をオブジェクト型で取得  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getRgb();  // {r: 255, g: 255, b: 255}

const color = new RecoColor("abc");
color.getRgb();  // {r: 170, g: 187, b: 204}

const color = new RecoColor([0, 10, 255]);
color.getRgb();  // {r: 0, g: 10, b: 255}

const color = new RecoColor("#ffff");
color.getRgb();  // undefined
```

#### getHex

HEX値で表した場合の値を取得  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getHex();  // "ffffff"

const color = new RecoColor("abc");
color.getHex();  // "aabbcc"

const color = new RecoColor([0, 10, 255]);
color.getHex();  // "000aff"

const color = new RecoColor("#ffff");
color.getHex();  // undefined
```

#### getRed

Rの値を数値で取得  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getRed();  // 255

const color = new RecoColor("abc");
color.getRed();  // 170

const color = new RecoColor([0, 10, 255]);
color.getRed();  // 0

const color = new RecoColor("#ffff");
color.getRed();  // undefined
```


#### getGreen

Gの値を数値で取得  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getGreen();  // 255

const color = new RecoColor("abc");
color.getGreen();  // 180

const color = new RecoColor([0, 10, 255]);
color.getGreen();  // 10

const color = new RecoColor("#ffff");
color.getGreen();  // undefined
```


#### getBlue

Bの値を数値で取得  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getBlue();  // 255

const color = new RecoColor("abc");
color.getBlue();  // 204

const color = new RecoColor([0, 10, 255]);
color.getBlue();  // 255

const color = new RecoColor("#ffff");
color.getBlue();  // undefined
```


#### getClashingColor

反対色の値を RGBのオブジェクト もしくは HEX値 で取得  
HEX値で取得する場合、引数で 'HEX' 'Hex' 'hex' いずれかの文字列を渡す  
それ以外の場合 RGBのオブジェクト を返す  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getClashingColor();  // {r:0, g:0, b:0}

const color = new RecoColor("000");
color.getClashingColor();  // {r: 255, g: 255, b: 255}

const color = new RecoColor([30, 10, 240]);
color.getClashingColor();  // {r: 225, g: 245, b: 15}

const color = new RecoColor("rgb(200, 10, 1)");
color.getClashingColor();  // {r: 55, g: 245, b: 254}

const color = new RecoColor("#fff");
color.getClashingColor('HEX');  // "000000"

const color = new RecoColor([30, 10, 240]);
color.getClashingColor('Hex');  // "e1f50f"

const color = new RecoColor("rgb(200, 10, 1)");
color.getClashingColor('hex');  // "37f5fe"

const color = new RecoColor("#ffff");
color.getClashingColor();  // undefined
```

#### getComplementaryColor

補色の値を RGBのオブジェクト もしくは HEX値 で取得  
HEX値で取得する場合、引数で 'HEX' 'Hex' 'hex' いずれかの文字列を渡す  
それ以外の場合 RGBのオブジェクト を返す  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getComplementaryColor();  // {r: 255, g: 255, b: 255}

const color = new RecoColor("000");
color.getComplementaryColor();  // {r:0, g:0, b:0}

const color = new RecoColor([30, 10, 240]);
color.getComplementaryColor();  // {r: 225, g: 245, b: 15}

const color = new RecoColor("rgb(200, 10, 1)");
color.getComplementaryColor();  // {r: 1, g: 191, b: 200}

const color = new RecoColor("#fff");
color.getComplementaryColor('HEX');  // "ffffff"

const color = new RecoColor([30, 10, 240]);
color.getComplementaryColor('Hex');  // "dcf00a"

const color = new RecoColor("rgb(200, 10, 1)");
color.getComplementaryColor('hex');  // "01bfc8"

const color = new RecoColor("#ffff");
color.getComplementaryColor();  // undefined
```


#### isRgb

設定した値がRGB値か判定

```javascript
const color = new RecoColor([0, 10, 255]);
color.isHex();  // true

const color = new RecoColor("#fff");
color.isHex();  // false
```


#### isHex

設定した値がHEX値か判定

```javascript
const color = new RecoColor([0, 10, 255]);
color.isHex();  // false

const color = new RecoColor("#fff");
color.isHex();  // true
```
