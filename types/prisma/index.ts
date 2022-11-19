import { Prisma } from "@prisma/client";

const userType = Prisma.validator<Prisma.UserArgs>()({});

export type UserType = Prisma.UserGetPayload<typeof userType>;
