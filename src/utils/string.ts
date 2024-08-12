export function normalize(str: string) {
  return str
    .normalize('NFD')
    .split('')
    .map((charset) => {
      return new RegExp(/[a-z0-9 ]/gi).test(charset) ? charset : '';
    })
    .join('');
}

export function camelize(str: string) {
  return normalize(str)
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (charset, index) {
      return index === 0 ? charset.toLowerCase() : charset.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function captalize(str: string) {
  return str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;
}
