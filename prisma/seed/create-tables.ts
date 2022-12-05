export const user = async () => {
  //try {
  //  const hashedPw = await bcrypt.hash(
  //    process.env.NEXT_PUBLIC_TEST_USER_PASSWORD as string,
  //    5
  //  );
  //  const UUID = crypto.randomUUID();
  //
  //  await prisma.user.create({
  //    data: {
  //      email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL as string,
  //      password: hashedPw,
  //      UUID: UUID,
  //      type: "driver",
  //      address: "Piritanaukio 1 B 26",
  //    },
  //  });
  //
  //  await prisma.user.create({
  //    data: {
  //      email: "asiakas@gmail.com" as string,
  //      password: hashedPw,
  //      UUID: crypto.randomUUID(),
  //      type: "client",
  //      address: "Koskelantie 31 C 26",
  //    },
  //  });
  //} catch (err) {
  //  console.log(err);
  //
  //  console.log("Seeding users threw error");
  //}
};
