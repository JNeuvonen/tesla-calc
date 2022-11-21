-- CreateTable
CREATE TABLE "ForgotPasswordLink" (
    "ID" SERIAL NOT NULL,
    "UUID" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForgotPasswordLink_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForgotPasswordLink_UUID_key" ON "ForgotPasswordLink"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "ForgotPasswordLink_userID_key" ON "ForgotPasswordLink"("userID");

-- AddForeignKey
ALTER TABLE "ForgotPasswordLink" ADD CONSTRAINT "ForgotPasswordLink_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
