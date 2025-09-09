-- CreateTable
CREATE TABLE "public"."TipForm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ownerRelation" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "ownerName" TEXT,
    "ownerContact" TEXT,
    "prize" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TipForm_pkey" PRIMARY KEY ("id")
);
