-- CreateTable
CREATE TABLE "Dialog" (
    "id" SERIAL NOT NULL,
    "dialogId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dialog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "username" TEXT,
    "avatar" TEXT,
    "role" INTEGER,
    "platform" TEXT,
    "email" TEXT,
    "subscriptionId" TEXT,
    "customerId" TEXT,
    "variantId" INTEGER,
    "currentPeriodEnd" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dialog_dialogId_key" ON "Dialog"("dialogId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "Dialog" ADD CONSTRAINT "Dialog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
