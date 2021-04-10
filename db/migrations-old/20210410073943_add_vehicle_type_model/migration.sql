-- CreateTable
CREATE TABLE "VehicleType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType.type_unique" ON "VehicleType"("type");
