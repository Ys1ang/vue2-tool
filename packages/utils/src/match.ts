export const REG_PHONE = /^1[3-9]\d{9}$/;
export const REG_LANDLINE_PHONE = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
export const REG_ID_CARD =
  /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
export const REG_POSTCODE = /^[1-9]\d{5}$/;
export const REG_EMAIL = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
export const REG_URL =
  /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i;
export const REG_PASSWORD = /^[!-~]{8,20}$/;
/**
 * @name 匹配是否为纯数字（会匹配空字符串）
 */
export const REG_PURE_NUMBER = /^-?(0|[1-9]\d*)(\.\d+)?$/;

export function isStringOrNumber(str: unknown): str is string | number {
  return typeof str === 'string' || typeof str === 'number';
}

export function isPhoneNumber(str: unknown) {
  return isStringOrNumber(str) && REG_PHONE.test(str.toString());
}

export function isLandlinePhone(str: unknown) {
  return isStringOrNumber(str) && REG_LANDLINE_PHONE.test(str.toString());
}

export function isIdCard(str: unknown) {
  return isStringOrNumber(str) && REG_ID_CARD.test(str.toString());
}

export function isPostcode(str: unknown) {
  return isStringOrNumber(str) && REG_POSTCODE.test(str.toString());
}

export function isEmail(str: unknown) {
  return isStringOrNumber(str) && REG_EMAIL.test(str.toString());
}

export function isUrl(str: unknown) {
  return isStringOrNumber(str) && REG_URL.test(str.toString());
}

/**
 * @name 匹配输入是否为纯数字（会匹配空字符串）
 * @param arg 传入参数
 */
export function isPureNumber(arg: unknown) {
  return (
    (typeof arg === 'number' && !isNaN(arg)) ||
    (typeof arg === 'string' && REG_PURE_NUMBER.test(arg))
  );
}

/**
 * @name 匹配正确的密码格式
 */
export function isPassword(str: unknown) {
  return isStringOrNumber(str) && REG_PASSWORD.test(str.toString());
}
