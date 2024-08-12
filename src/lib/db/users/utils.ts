export const isSupport = (email: string): boolean => {
  return (
    email.endsWith(`@rcandrade.com`) ||
    email.endsWith(`@rocketnova.com.br`) ||
    false
  );
};
