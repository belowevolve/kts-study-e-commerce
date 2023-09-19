export const convertStringToNumber = (value: string): number | null => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return null;
  }

  return number;
};
