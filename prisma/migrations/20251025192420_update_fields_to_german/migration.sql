/*
  Warnings:

  - You are about to drop the column `address` on the `TipForm` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `TipForm` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `TipForm` table. All the data in the column will be lost.
  - You are about to drop the column `ownerContact` on the `TipForm` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `TipForm` table. All the data in the column will be lost.
  - You are about to drop the column `ownerRelation` on the `TipForm` table. All the data in the column will be lost.
  - You are about to drop the column `prize` on the `TipForm` table. All the data in the column will be lost.
  - You are about to drop the column `propertyAddress` on the `TipForm` table. All the data in the column will be lost.
  - Added the required column `beziehungEigentuemer` to the `TipForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `immobilienAdresse` to the `TipForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plzOderStadt` to the `TipForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `praemie` to the `TipForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tippgeberAdresse` to the `TipForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tippgeberKontakt` to the `TipForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tippgeberName` to the `TipForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."TipForm" DROP COLUMN "address",
DROP COLUMN "contact",
DROP COLUMN "name",
DROP COLUMN "ownerContact",
DROP COLUMN "ownerName",
DROP COLUMN "ownerRelation",
DROP COLUMN "prize",
DROP COLUMN "propertyAddress",
ADD COLUMN     "beziehungEigentuemer" TEXT NOT NULL,
ADD COLUMN     "eigentuemerKontakt" TEXT,
ADD COLUMN     "eigentuemerName" TEXT,
ADD COLUMN     "immobilienAdresse" TEXT NOT NULL,
ADD COLUMN     "plzOderStadt" TEXT NOT NULL,
ADD COLUMN     "praemie" TEXT NOT NULL,
ADD COLUMN     "tippgeberAdresse" TEXT NOT NULL,
ADD COLUMN     "tippgeberKontakt" TEXT NOT NULL,
ADD COLUMN     "tippgeberName" TEXT NOT NULL;
