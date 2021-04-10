-- CreateTable
CREATE TABLE "Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "makeModel" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturingYear" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "engineNumber" TEXT NOT NULL,
    "chasisNumber" TEXT NOT NULL,
    "isSecondary" BOOLEAN NOT NULL
);
