/*
  Warnings:

  - A unique constraint covering the columns `[signId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_signId_key" ON "users"("signId");
