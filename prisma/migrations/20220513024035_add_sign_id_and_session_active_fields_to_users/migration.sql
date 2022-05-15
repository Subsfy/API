-- AlterTable
ALTER TABLE "users" ADD COLUMN     "sessionActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "signId" TEXT NOT NULL DEFAULT E'';
