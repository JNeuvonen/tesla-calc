export const getInputFieldValById = (id: string) => {
  const input = document.getElementById(id) as HTMLInputElement | null;
  if (!input) {
    return null;
  }

  return input.value;
};

export const stringIncludes = (a: string, b: string) => {
  if (a.toLowerCase().includes(b.toLowerCase())) {
    return true;
  }
  return b.toLowerCase().includes(a.toLowerCase());
};

export const generateNewHref = (
  oldPath: string,
  replacement: string,
  replaceIndex: number
) => {
  const splittedStr = oldPath.split("/");

  splittedStr[replaceIndex] = replacement;

  let ret = "";

  splittedStr.forEach((item) => {
    ret += item + "/";
  });

  return ret.toLowerCase().replace(" ", "");
};

export const stringCapitalizeFirst = (str: string) => {
  return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
};
