export default class Money {
  static format(value) {
    if (!value) return '';
    const l = value.replace(/^[0|\D]*/g, '');
    const d = l.match(/\d/g);
    if (!d) return '';
    if (d.length === 1) return `0,0${d[0]}`;
    if (d.length === 2) return `0,${d[0]}${d[1]}`;
    if (d.length === 3) return `${d[0]},${d[1]}${d[2]}`;
    if (d.length === 4) return `${d[0]}${d[1]},${d[2]}${d[3]}`;
    if (d.length === 5) return `${d[0]}${d[1]}${d[2]},${d[3]}${d[4]}`;
    if (d.length === 6) return `${d[0]}.${d[1]}${d[2]}${d[3]},${d[4]}${d[5]}`;
    if (d.length === 7)
      return `${d[0]}${d[1]}.${d[2]}${d[3]}${d[4]},${d[5]}${d[6]}`;
    if (d.length === 8)
      return `${d[0]}${d[1]}${d[2]}.${d[3]}${d[4]}${d[5]},${d[6]}${d[7]}`;
    if (d.length === 9)
      return `${d[0]}.${d[1]}${d[2]}${d[3]}.${d[4]}${d[5]}${d[6]},${d[7]}${d[8]}`;
    if (d.length === 10)
      return `${d[0]}${d[1]}.${d[2]}${d[3]}${d[4]}.${d[5]}${d[6]}${d[7]},${d[8]}${d[9]}`;
    if (d.length >= 11)
      return `${d[0]}${d[1]}${d[2]}.${d[3]}${d[4]}${d[5]}.${d[6]}${d[7]}${d[8]},${d[9]}${d[10]}`;
    return value;
  }

  static strip(value) {
    if (!value || value === '') return null;
    const l1 = value.replace(/\./g, '');
    const l2 = l1.replace(',', '.');
    return parseFloat(l2);
  }
}
