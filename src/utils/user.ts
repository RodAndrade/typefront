export function isEmail(text?: string): boolean {
  if (!text) {
    return false;
  }

  const emailTest = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/gi;
  return emailTest.test(text.trim());
}

export function getInitials(nameOrEmail: string): string {
  let names: string[] = [];
  let initials: string = '';

  if (!nameOrEmail.length) {
    return initials;
  }

  const toSplit = new RegExp('[ _.-]');

  nameOrEmail = nameOrEmail.trim();

  if (isEmail(nameOrEmail)) {
    const emailName = nameOrEmail
      .substr(0, nameOrEmail.indexOf('@'))
      .split(toSplit);
    names.push(...emailName);
  } else {
    names.push(...nameOrEmail.split(toSplit));
  }

  return names
    .map((name, i) => {
      return i === 0 || i === names.length - 1 ? name[0] : '';
    })
    .join('')
    .toUpperCase();
}
