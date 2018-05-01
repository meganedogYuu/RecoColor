# RecoColor [![Build Status](https://travis-ci.org/meganedogYuu/recoColor.svg?branch=master)](https://travis-ci.org/meganedogYuu/recoColor) [![npm version](https://badge.fury.io/js/recocolor.svg)](https://badge.fury.io/js/recocolor)

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


#### HEX

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

#### HSV

- 文字列、オブジェクト型に対応
- h・・0 ~ 360
- s・・0 ~ 100
- b・・0 ~ 100

```javascript
const color = new RecoColor("hsv(360, 0, 0)");
const color = new RecoColor("HSV(0, 100, 100)");
const color = new RecoColor({h: 100, s: 50, v:100});

const color = new RecoColor();
color.set("hsv(360, 0, 0)");

const color = new RecoColor();
color.set("HSV(0, 100, 100)");

const color = new RecoColor();
color.set({h: 100, s: 50, v:100});
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

設定した色のタイプを "RGB", "HEX", "HSV", "none" の中から取得  
（`RecoColor`で判定が出来ない値の場合は全て "none" になります）

```javascript
const color = new RecoColor([0, 10, 255]);
color.getType();  // "RGB"

const color = new RecoColor("#fff");
color.getType();  // "HEX"

const color = new RecoColor({h: 100, s: 50, v:100});
color.getType();  // "HSV"

const color = new RecoColor("1234567");
color.getType();  // "none"
```

#### getRgb

RGB値で表した場合の値をオブジェクト型で取得  
設定した値が小数点を含む値の場合、小数点第一位を四捨五入したHEX値を返す  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getRgb();  // {r: 255, g: 255, b: 255}

const color = new RecoColor("abc");
color.getRgb();  // {r: 170, g: 187, b: 204}

const color = new RecoColor([0, 10, 255]);
color.getRgb();  // {r: 0, g: 10, b: 255}

const color = new RecoColor({h: 234, s: 50, v:96});
color.getRgb();  // {r: 122, g: 135, b: 245}

const color = new RecoColor("#ffff");
color.getRgb();  // undefined
```

#### getHex

HEX値で表した場合の値を取得  
設定した値が小数点を含む値の場合、小数点第一位を四捨五入したHEX値を返す  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getHex();  // "ffffff"

const color = new RecoColor("abc");
color.getHex();  // "aabbcc"

const color = new RecoColor([0, 10, 255]);
color.getHex();  // "000aff"

const color = new RecoColor({h: 234, s: 50, v:96});
color.getHex();  // "7a87f5"

const color = new RecoColor("#ffff");
color.getHex();  // undefined
```

#### getRed

Rの値を数値で取得  
設定した値が小数点を含む値の場合、小数点第一位を四捨五入した値を返す  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getRed();  // 255

const color = new RecoColor("abc");
color.getRed();  // 170

const color = new RecoColor([0, 10, 255]);
color.getRed();  // 0

const color = new RecoColor({h: 234, s: 50, v:96});
color.getRed();  // 122

const color = new RecoColor("#ffff");
color.getRed();  // undefined
```


#### getGreen

Gの値を数値で取得  
設定した値が小数点を含む値の場合、小数点第一位を四捨五入した値を返す  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getGreen();  // 255

const color = new RecoColor("abc");
color.getGreen();  // 180

const color = new RecoColor([0, 10, 255]);
color.getGreen();  // 10

const color = new RecoColor({h: 234, s: 50, v:96});
color.getGreen();  // 135

const color = new RecoColor("#ffff");
color.getGreen();  // undefined
```


#### getBlue

Bの値を数値で取得  
設定した値が小数点を含む値の場合、小数点第一位を四捨五入した値を返す  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getBlue();  // 255

const color = new RecoColor("abc");
color.getBlue();  // 204

const color = new RecoColor([0, 10, 255]);
color.getBlue();  // 255

const color = new RecoColor({h: 234, s: 50, v:96});
color.getBlue();  // 245

const color = new RecoColor("#ffff");
color.getBlue();  // undefined
```


#### getHsv

HSVのオブジェクト型で表した場合の値を取得  
それぞれのとれる値の範囲は以下のようになり、小数点第一位を四捨五入した値で取得

- H： 0 ~ 360
- S： 0 ~ 100
- V： 0 ~ 100

（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#fff");
color.getHsv();  // {h: 0, s: 0, v: 100}

const color = new RecoColor("abc");
color.getHsv();  // {h: 210, s: 17, v: 80}

const color = new RecoColor([0, 10, 255]);
color.getHsv();  // {h: 238, s: 100, v: 100}

const color = new RecoColor("#ffff");
color.getHsv();  // undefined
```


#### getClashingColor

反対色の値を RGBのオブジェクト もしくは HEX値 で取得  
HEX値で取得する場合、引数で 'HEX' 'Hex' 'hex' いずれかの文字列を渡す  

それ以外の場合 RGBのオブジェクト を返す  
また、設定した値が小数点を含む値の場合、小数点第一位を四捨五入した値を返す  
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
また、設定した値が小数点を含む値の場合、小数点第一位を四捨五入した値を返す  
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


#### getDyad

ダイアードの値を RGBのオブジェクト・HEX値・HSVのオブジェクト のいずれかで取得  
オプションで最初に指定したオリジナルの値を含めるか、RGB・HEXといったどのタイプで取得するかを指定する

##### オプション

| オプション  | 値の型  | defalut | 補足 |
|:------------- |:---------------| -------------| -------------|
| hasOriginal  | boolean | false | オリジナルの値を含める場合true |
| type            | string   | 'RGB' | 取得する型  以下の3種類を指定可能<br> 'RGB', 'HSV, 'HEX' （大文字小文字問わず）|

また、設定した値が小数点を含む値の場合、小数点第一位を四捨五入した値を返す  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#f00");
color.getDyad();
// => [{r: 0, g: 255, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color.getDyad();
// => [{r: 1, g: 191, b: 200}]

const color = new RecoColor({h: 234, s: 50, v:96});
color.getDyad();
// => [{r: 245, g: 233, b: 122}]

const color = new RecoColor("#f00");
color.getDyad({hasOriginal: true});
// => [{r: 255, g: 0, b: 0}, {r: 0, g: 255, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color.getDyad({type: 'hex'});
// => ['01bfc8']

const color = new RecoColor({h: 234, s: 50, v:96});
color.getDyad({type: 'hsv'});
// => [{h: 54, s: 50, v: 96}]

const color = new RecoColor("rgb(200, 10, 1)");
color.getDyad({hasOriginal: true, type: 'hex'});
// => ['c80a01', '01bfc8']

const color = new RecoColor("#ffff");
color.getDyad();  // undefined
```



#### getTriad

トライアドの値を RGBのオブジェクト・HEX値・HSVのオブジェクト のいずれかで取得  
オプションで最初に指定したオリジナルの値を含めるか、RGB・HEXといったどのタイプで取得するかを指定する

##### オプション

| オプション  | 値の型  | defalut | 補足 |
|:------------- |:---------------| -------------| -------------|
| hasOriginal  | boolean | false | オリジナルの値を含める場合true |
| type            | string   | 'RGB' | 取得する型  以下の3種類を指定可能<br> 'RGB', 'HSV, 'HEX' （大文字小文字問わず）|

また、設定した値が小数点を含む値の場合、小数点第一位を四捨五入した値を返す  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#f00");
color.getTriad();
// => [{r: 0, g: 255, b: 0}, {r: 0, g: 0, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color.getTriad();
// => [{r: 1, g: 200, b: 10}, {r: 10, g: 1, b: 200}]

const color = new RecoColor({h: 234, s: 50, v:96});
color.getTriad();
// => [{r: 245, g: 122, b: 135}, {r: 135, g: 245, b: 122}]

const color = new RecoColor("#f00");
color.getTriad({hasOriginal: true});
// => [{r: 255, g: 0, b: 0}, {r: 0, g: 255, b: 0}, {r: 0, g: 0, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color.getTriad({type: 'hex'});
// => ['01c80a', '0a01c8']

const color = new RecoColor({h: 234, s: 50, v:96});
color.getTriad({type: 'hsv'});
// => [{h: 354, s: 50, v: 96}, {h: 114, s: 50, v: 96}]

const color = new RecoColor("rgb(200, 10, 1)");
color.getTriad({hasOriginal: true, type: 'hex'});
// => ['c80a01', '01c80a', '0a01c8']

const color = new RecoColor("#ffff");
color.getTriad();  // undefined
```

#### getTetrad

テトラードの値を RGBのオブジェクト・HEX値・HSVのオブジェクト のいずれかで取得  
オプションで最初に指定したオリジナルの値を含めるか、RGB・HEXといったどのタイプで取得するかを指定する

##### オプション

| オプション  | 値の型  | defalut | 補足 |
|:------------- |:---------------| -------------| -------------|
| hasOriginal  | boolean | false | オリジナルの値を含める場合true |
| type            | string   | 'RGB' | 取得する型  以下の3種類を指定可能<br> 'RGB', 'HSV, 'HEX' （大文字小文字問わず）|

また、設定した値が小数点を含む値の場合、小数点第一位を四捨五入した値を返す  
（設定した値が正しくない場合は `undefined` を返します）

```javascript
const color = new RecoColor("#f00");
color. getTetrad();
// => [{r: 128, g: 255, b: 0}, {r: 0, g: 255, b: 255}, {r: 128, g: 0, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getTetrad();
// => [{r: 92, g: 200, b: 1}, {r: 1, g: 191, b: 200}, {r: 110, g: 1, b: 200}]

const color = new RecoColor({h: 234, s: 50, v:96});
color. getTetrad();
// => [{r: 245, g: 122, b: 196}, {r: 245, g: 233, b: 122}, {r: 122, g: 245, b: 171}]

const color = new RecoColor("#f00");
color. getTetrad({hasOriginal: true});
// => [{r: 255, g: 0, b: 0}, {r: 128, g: 255, b: 0}, {r: 0, g: 255, b: 255}, {r: 128, g: 0, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getTetrad({type: 'hex'});
// => ['5cc801', '01bfc8', '6e01c8']

const color = new RecoColor({h: 234, s: 50, v:96});
color. getTetrad({type: 'hsv'});
// => [{h: 324, s: 50, v: 96}, {h: 54, s: 50, v: 96}, {h: 144, s: 50, v: 96}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getTetrad({hasOriginal: true, type: 'hex'});
// => ['c80a01', '5cc801', '01bfc8', '6e01c8']

const color = new RecoColor("#ffff");
color. getTetrad();  // undefined
```


#### getPentad

ペンタードの値を RGBのオブジェクト・HEX値・HSVのオブジェクト のいずれかで取得  
オプションで最初に指定したオリジナルの値を含めるか、RGB・HEXといったどのタイプで取得するかを指定する

##### オプション

| オプション  | 値の型  | defalut | 補足 |
|:------------- |:---------------| -------------| -------------|
| hasOriginal  | boolean | false | オリジナルの値を含める場合true |
| type            | string   | 'RGB' | 取得する型  以下の3種類を指定可能<br> 'RGB', 'HSV, 'HEX' （大文字小文字問わず）|

また、設定した値が小数点を含む値の場合、小数点第一位を四捨五入した値を返す  
（設定した値が正しくない場合は `undefined` を返します）

※ ペンタード配色はテトラード配色に白・黒を追加した配色を指す場合もありますが、ここでは色相差72℃の4色（hasOriginalがtrueの場合5色）を取得します

```javascript
const color = new RecoColor("#f00");
color. getPentad();
// => [{r: 204, g: 255, b: 0}, {r: 0, g: 255, b: 102}, {r: 0, g: 102, b: 255}, {r: 204, g: 0, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getPentad();
// => [{r: 151, g: 200, b: 1}, {r: 1, g: 200, b: 90}, {r: 1, g: 72, b: 200}, {r: 169, g: 1, b: 200}]

const color = new RecoColor({h: 234, s: 50, v:96});
color. getPentad();
// => [{r: 245, g: 122, b: 233}, {r: 245, g: 159, b: 122}, {r: 184, g: 245, b: 122}, {r: 122, g: 245, b: 208}]

const color = new RecoColor("#f00");
color. getPentad({hasOriginal: true});
// => [{r: 255, g: 0, b: 0}, {r: 204, g: 255, b: 0}, {r: 0, g: 255, b: 102}, {r: 0, g: 102, b: 255}, {r: 204, g: 0, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getPentad({type: 'hex'});
// => ['97c801', '01c85a', '0148c8', 'a901c8']

const color = new RecoColor({h: 234, s: 50, v:96});
color. getPentad({type: 'hsv'});
// => [{h: 306, s: 50, v: 96}, {h: 18, s: 50, v: 96}, {h: 90, s: 50, v: 96}, {h: 162, s: 50, v: 96}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getPentad({hasOriginal: true, type: 'hex'});
// => ['c80a01', '97c801', '01c85a', '0148c8', 'a901c8']

const color = new RecoColor("#ffff");
color. getPentad();  // undefined
```

#### getHexad

ヘクサードの値を RGBのオブジェクト・HEX値・HSVのオブジェクト のいずれかで取得  
オプションで最初に指定したオリジナルの値を含めるか、RGB・HEXといったどのタイプで取得するかを指定する

##### オプション

| オプション  | 値の型  | defalut | 補足 |
|:------------- |:---------------| -------------| -------------|
| hasOriginal  | boolean | false | オリジナルの値を含める場合true |
| type            | string   | 'RGB' | 取得する型  以下の3種類を指定可能<br> 'RGB', 'HSV, 'HEX' （大文字小文字問わず）|

また、設定した値が小数点を含む値の場合、小数点第一位を四捨五入した値を返す  
（設定した値が正しくない場合は `undefined` を返します）


```javascript
const color = new RecoColor("#f00");
color. getHexad();
// =>[{r: 255, g: 255, b: 0}, {r: 0, g: 255, b: 0}, {r: 0, g: 255, b: 255}, {r: 0, g: 0, b: 255}, {r: 255, g: 0, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getHexad();
// => [{r: 191, g: 200, b: 1}, {r: 1, g: 200, b: 10}, {r: 1, g: 191, b: 200}, {r: 10, g: 1, b: 200}, {r: 200, g: 1, b: 191}]

const color = new RecoColor({h: 234, s: 50, v:96});
color. getHexad();
// => [{r: 233, g: 122, b: 245}, {r: 245, g: 122, b: 135}, {r: 245, g: 233, b: 122}, {r: 135, g: 245, b: 122}, { r: 122, g: 245, b: 233}]

const color = new RecoColor("#f00");
color. getHexad({hasOriginal: true});
// => [{r: 255, g: 0, b: 0}, {r: 255, g: 255, b: 0}, {r: 0, g: 255, b: 0}, {r: 0, g: 255, b: 255}, {r: 0, g: 0, b: 255}, {r: 255, g: 0, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getHexad({type: 'hex'});
// => ['bfc801', '01c80a', '01bfc8', '0a01c8', 'c801bf']

const color = new RecoColor({h: 234, s: 50, v:96});
color. getHexad({type: 'hsv'});
// => [{h: 294, s: 50, v: 96}, {h: 354, s: 50, v: 96}, {h: 54, s: 50, v: 96}, {h: 114, s: 50, v: 96}, {h: 174, s: 50, v: 96}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getHexad({hasOriginal: true, type: 'hex'});
// => ['c80a01', 'bfc801', '01c80a', '01bfc8', '0a01c8', 'c801bf']

const color = new RecoColor("#ffff");
color. getHexad();  // undefined
```


#### getSplitComplementary

スプリット・コンプリメンタリーの値を RGBのオブジェクト・HEX値・HSVのオブジェクト のいずれかで取得  
オプションで最初に指定したオリジナルの値を含めるか、RGB・HEXといったどのタイプで取得するかを指定する

##### オプション

| オプション  | 値の型  | defalut | 補足 |
|:------------- |:---------------| -------------| -------------|
| hasOriginal  | boolean | false | オリジナルの値を含める場合true |
| type            | string   | 'RGB' | 取得する型  以下の3種類を指定可能<br> 'RGB', 'HSV, 'HEX' （大文字小文字問わず）|

また、設定した値が小数点を含む値の場合、小数点第一位を四捨五入した値を返す  
（設定した値が正しくない場合は `undefined` を返します）


```javascript
const color = new RecoColor("#f00");
color. getSplitComplementary();
// =>[{r: 0, g: 255, b: 128}, {r: 0, g: 128, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getSplitComplementary();
// => [{r: 1, g: 200, b: 109}, {r: 1, g: 92, b: 200}]

const color = new RecoColor({h: 234, s: 50, v:96});
color. getSplitComplementary();
// => [{r: 245, g: 171, b: 122}, {r: 196, g: 245, b: 122}]

const color = new RecoColor("#f00");
color. getSplitComplementary({hasOriginal: true});
// => [{r: 255, g: 0, b: 0}, {r: 0, g: 255, b: 128}, {r: 0, g: 128, b: 255}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getSplitComplementary({type: 'hex'});
// => ['01c86d', '015cc8']

const color = new RecoColor({h: 234, s: 50, v:96});
color. getSplitComplementary({type: 'hsv'});
// => [{h: 24, s: 50, v: 96}, {h: 84, s: 50, v: 96}]

const color = new RecoColor("rgb(200, 10, 1)");
color. getSplitComplementary({hasOriginal: true, type: 'hex'});
// => ['c80a01', '01c86d', '015cc8']

const color = new RecoColor("#ffff");
color. getSplitComplementary();  // undefined
```


#### isRgb

設定した値がRGB値か判定

```javascript
const color = new RecoColor([0, 10, 255]);
color.isRgb();  // true

const color = new RecoColor("#fff");
color.isRgb();  // false

const color = new RecoColor({h: 100, s: 50, v:100});
color.isRgb();  // false
```


#### isHex

設定した値がHEX値か判定

```javascript
const color = new RecoColor([0, 10, 255]);
color.isHex();  // false

const color = new RecoColor("#fff");
color.isHex();  // true

const color = new RecoColor({h: 100, s: 50, v:100});
color.isHex();  // false

```

#### isHsv

設定した値がHSV値か判定

```javascript
const color = new RecoColor([0, 10, 255]);
color.isHsv();  // false

const color = new RecoColor("#fff");
color.isHsv();  // false

const color = new RecoColor({h: 100, s: 50, v:100});
color.isHsv();  // true

```