-- CreateTable
CREATE TABLE "User" (
    "ID" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "UUID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ForgotPasswordLink" (
    "ID" SERIAL NOT NULL,
    "UUID" TEXT NOT NULL,
    "userID" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForgotPasswordLink_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_UUID_key" ON "User"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ForgotPasswordLink_UUID_key" ON "ForgotPasswordLink"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "ForgotPasswordLink_userID_key" ON "ForgotPasswordLink"("userID");

-- AddForeignKey
ALTER TABLE "ForgotPasswordLink" ADD CONSTRAINT "ForgotPasswordLink_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
