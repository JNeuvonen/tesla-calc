export const getInputFieldValById = (id: string) => {
  const input = document.getElementById(id) as HTMLInputElement | null;
  if (!input) {
    return null;
  }

  return input.value;
};
