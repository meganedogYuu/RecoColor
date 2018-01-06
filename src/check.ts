/**
 * HEX値かの判定を行う
 * OK: "#ff0000", "#ff0", "ff0000", "ff0"
 *
 * 条件:
 * - #が付く場合は最初につくこと
 * - #を外した状態で3ケタ・6ケタであること
 * - 0~fの値であること
 *
 * @param {string} val
 * @returns {boolean}
 */
export function isHex(val: string): boolean {

  // "#"が付く場合は最初につくこと
  if (val.includes('#') && !/^#.+/.test(val)) return false;

  // #を外した状態で3ケタ・6ケタであること
  const hex: string = val.includes('#') ? val.replace('#', '') : val;
  if (hex.length !== 3 && hex.length !== 6) return false;

  // 0~fの値であること
  return (/^[0-9a-fA-F]*$/.test(hex));
}
