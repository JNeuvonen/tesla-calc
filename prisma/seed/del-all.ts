import { PrismaClient } from "@prisma/client";

import * as createTableFuncs from "./create-tables";

const prisma = new PrismaClient();

const getTableNames = () => {
  const tableNames = [];
  for (const [key] of Object.entries(createTableFuncs)) {
    tableNames.push(key);
  }
  return tableNames;
};

async function delAll(arrOfObjects: string[]) {
  arrOfObjects.forEach(async (item) => {
    //@ts-ignore
    await prisma[item].deleteMany({});
  });
}

delAll(getTableNames());

console.log("Deleted the DB");
