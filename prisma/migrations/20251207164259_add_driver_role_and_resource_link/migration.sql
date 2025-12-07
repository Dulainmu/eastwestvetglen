/*
  Warnings:

  - You are about to drop the column `stripePaymentIntentId` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "ResourceType" ADD VALUE 'VEHICLE';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'DRIVER';

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "stripePaymentIntentId",
ADD COLUMN     "resourceId" TEXT;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
