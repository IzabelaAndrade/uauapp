export default class DateFormat {
  static format(str) {
    if (str === '') return '';
    const mD = str.match(/\d/g);
    if (!mD) return '';
    if (mD.length === 1) return `${mD[0]}`;
    if (mD.length === 2) return `${mD[0]}${mD[1]}`;
    if (mD.length === 3) return `${mD[0]}${mD[1]}/${mD[2]}`;
    if (mD.length === 4) return `${mD[0]}${mD[1]}/${mD[2]}${mD[3]}`;
    if (mD.length === 5) return `${mD[0]}${mD[1]}/${mD[2]}${mD[3]}/${mD[4]}`;
    if (mD.length === 6)
      return `${mD[0]}${mD[1]}/${mD[2]}${mD[3]}/${mD[4]}${mD[5]}`;
    if (mD.length === 7)
      return `${mD[0]}${mD[1]}/${mD[2]}${mD[3]}/${mD[4]}${mD[5]}${mD[6]}`;
    if (mD.length === 8)
      return `${mD[0]}${mD[1]}/${mD[2]}${mD[3]}/${mD[4]}${mD[5]}${mD[6]}${mD[7]}`;
  }
}
