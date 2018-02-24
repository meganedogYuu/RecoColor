# recoColor

色の変換・確認を行うライブラリ

## インストール

```bash
npm install recocolor
```

```javascript
const recoColor = require("recocolor");
const color = new recoColor("#fff");
```

## 使い方

### 色の設定

#### RGB

- 配列、文字列、オブジェクト型に対応

```javascript
const color = new recoColor([0, 10, 255]);
const color = new recoColor("rgb(0, 120, 255)");
const color = new recoColor("RGB(0, 255, 255)");
const color = new recoColor("RGB(0,255,255)");
const color = new recoColor({r: 0, g: 0, b: 255});

const color = new recoColor();
color.set([0, 10, 255]);

const color = new recoColor();
color.set("rgb(0, 120, 255)");

const color = new recoColor();
color.set("RGB(0, 255, 255)");

const color = new recoColor();
color.set("RGB(0,255,255)");

const color = new recoColor();
color.set({r: 0, g: 0, b: 255});
```


#### Hex

- 3ケタ or 6ケタ
- `0~f` （大文字小文字どちらでもOK）
- `#` が先頭にあるないものどちらでもOK

```javascript
const color = new recoColor("#fff");
const color = new recoColor("#000000");
const color = new recoColor("ABC");
const color = new recoColor("00f0ab");

const color = new recoColor();
color.set("#fff");

const color = new recoColor();
color.set("#000000");

const color = new recoColor();
color.set("ABC");

const color = new recoColor();
color.set("00f0ab");
```


### メソッド

#### getOriginal

インスタンス化・`set()`で設定した値を取得
（誤った値の場合でも取得できます）

```javascript
const color = new recoColor("#fff");
color.getOriginal()  // "#fff"

const color = new recoColor([0, 10, 255]);
color.getOriginal()  // [0, 10, 255]

const color = new recoColor("1234567");
color.getOriginal()  // "1234567" => 誤った値でも取得可能 
```

#### getType

設定した色のタイプを "RGB", "HEX", "none" の中から取得
（`recoColor`で判定が出来ない値の場合は全て "none" になります）

```javascript
const color = new recoColor([0, 10, 255]);
color. getType()  // "RGB"

const color = new recoColor("#fff");
color. getType()  // "HEX"

const color = new recoColor("1234567");
color.getOriginal()  // "none"
```

#### getRgb

RGB値で表した場合の値をオブジェクト型で取得
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new recoColor("#fff");
color. getRgb()  // {r: 255, g: 255, b: 255}

const color = new recoColor("abc");
color. getRgb()  // {r: 170, g: 187, b: 204}

const color = new recoColor([0, 10, 255]);
color. getRgb()  // {r: 0, g: 10, b: 255}

const color = new recoColor("#ffff");
color. getRgb()  // undefined
```

#### getHex

HEX値で表した場合の値を取得
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new recoColor("#fff");
color. getHex()  // "ffffff"

const color = new recoColor("abc");
color. getHex()  // "aabbcc"

const color = new recoColor([0, 10, 255]);
color. getHex()  // "000aff"

const color = new recoColor("#ffff");
color. getHex()  // undefined
```

#### getRed

Rの値を数値で取得
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new recoColor("#fff");
color. getRed()  // 255

const color = new recoColor("abc");
color. getRed()  // 170

const color = new recoColor([0, 10, 255]);
color. getRed()  // 0

const color = new recoColor("#ffff");
color. getRed()  // undefined
```


#### getGreen

Gの値を数値で取得
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new recoColor("#fff");
color. getGreen()  // 255

const color = new recoColor("abc");
color. getGreen()  // 180

const color = new recoColor([0, 10, 255]);
color. getGreen()  // 10

const color = new recoColor("#ffff");
color. getGreen()  // undefined
```


#### getBlue

Bの値を数値で取得
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new recoColor("#fff");
color. getBlue()  // 255

const color = new recoColor("abc");
color. getBlue()  // 204

const color = new recoColor([0, 10, 255]);
color. getBlue()  // 255

const color = new recoColor("#ffff");
color. getBlue()  // undefined
```


#### getClashingColor

反対色の値をRGBのオブジェクトで取得
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new recoColor("#fff");
color. getClashingColor()  // {r:0, g:0, b:0}

const color = new recoColor("000");
color. getClashingColor()  // {r: 255, g: 255, b: 255}

const color = new recoColor([30, 10, 240]);
color. getClashingColor()  // {r: 225, g: 245, b: 15}

const color = new recoColor("rgb(200, 10, 1)");
color. getClashingColor()  // {r: 55, g: 245, b: 254}

const color = new recoColor("#ffff");
color. getClashingColor()  // undefined
```

#### isRgb

設定した値がRGB値か判定

```javascript
const color = new recoColor([0, 10, 255]);
color.isHex()  // true

const color = new recoColor("#fff");
color.isHex()  // false
```


#### isHex

設定した値がHEX値か判定

```javascript
const color = new recoColor([0, 10, 255]);
color.isHex()  // false

const color = new recoColor("#fff");
color.isHex()  // true
```
