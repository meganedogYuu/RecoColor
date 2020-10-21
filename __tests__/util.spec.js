const chai = require('chai');
const assert = chai.assert;
const util = require('../dist/utility/util.js');

describe('highMath の test', () => {
  describe('オプション指定なし', () => {
    const questions = [10, 212.2, 10.0, 11.2, 12.6, 134.12, 454.1256];
    const answers = [10, 212, 10, 11, 13, 134, 454];

    questions.forEach((question, index) => {
      it(`${question} to ${answers[index]}`, () => {
        const result = util.highMath(question);
        assert.strictEqual(result, answers[index]);
      });
    });
  });

  describe('第一引数 type の 文字列確認', () => {
    const questions = [10.5, 10.1, 10.5, 10.1, 10.5, 10.1, 10.5, 10.1, 10.5];
    const types = ['', 'ROUND', 'round', ' Ceil', 'ceil ', 'FLOOR  ', '  floor', 'original', 'ORIGINAL  '];
    const answers = [11, 10, 11, 11, 11, 10, 10, 10.1, 10.5];

    questions.forEach((question, index) => {
      it(`${question} to ${answers[index]} (type: ${types[index]})`, () => {
        const result = util.highMath(question, types[index]);
        assert.strictEqual(result, answers[index]);
      });
    });
  });

  describe('第二引数 decimal の 数値確認', () => {
    const question = 1234.3456;
    const decimals = [3, 2, 1, 0, -1, -2, -3];
    const answers = [1234.346, 1234.35, 1234.3, 1234, 1230, 1200, 1000];

    answers.forEach((answer, index) => {
      it(`${question} to ${answer} (decimal: ${decimals[index]})`, () => {
        const result = util.highMath(question, 'round', decimals[index]);
        assert.strictEqual(result, answer);
      });
    });
  });

  describe('第一引数 type・第二引数 decimal 両方を設定した場合', () => {
    const question = 1234.345;
    const types = ['floor', 'ceil', 'round', 'original'];
    const decimals = [2, 1, 0, -2];
    const answers = [1234.34, 1234.4, 1234, 1234.345];

    answers.forEach((answer, index) => {
      it(`${question} to ${answer} (types: ${types[index]}, decimal: ${decimals[index]})`, () => {
        const result = util.highMath(question, types[index], decimals[index]);
        assert.strictEqual(result, answer);
      });
    });
  });
});
