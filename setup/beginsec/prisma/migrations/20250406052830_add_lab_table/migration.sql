-- CreateTable
CREATE TABLE "Lab" (
    "LabId" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "LabName" TEXT NOT NULL,
    "Port" INTEGER NOT NULL,
    "ContainerId" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "RemainingTime" INTEGER NOT NULL,
    "TimeExpand" INTEGER NOT NULL,
    "ExpiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lab_pkey" PRIMARY KEY ("LabId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lab_userId_key" ON "Lab"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_Port_key" ON "Lab"("Port");

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
