
export default class CurrencyParser {
  constructor() {}

  static clpToNumber(clp: string): number {
    let format = 0;

    if (clp) {
      format = parseInt(clp.replace(/\$|\./g, ''));
      //console.log(format);
      return format;
    }

    return format;
  }

  static numberToClp(amount: number, separator = '.', symbol = '$'): any {
    let cleanValue = amount.toString().replace(/\D/g, '');
    let valueConverted: any = cleanValue ? cleanValue.split('').reverse() : '';
    if (!cleanValue) return '';
    const length = valueConverted.length;
    const sobr = length % 3;
    let finalValue;
    let array = [];

    valueConverted.reduce((previus: string, current: any, index: number) => {
      if (index % 3 == 0) {
        array.push(previus.split('').reverse().join(''));
        return current;
      }
      return previus + current;
    });
    if (sobr) {
      let valSobr = valueConverted.reverse().slice(0, sobr);
      let point = length < 3 ? '' : separator;
      finalValue = valSobr.join('') + point;
    } else {
      array.push(valueConverted.reverse().slice(0, 3).join(''));
    }
    return `${symbol}${finalValue ? finalValue : ''}${array
      .reverse()
      .join(separator)}`;
  }
}
