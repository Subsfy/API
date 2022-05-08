-- CreateEnum
CREATE TYPE "Type" AS ENUM ('ENTERTAINMENT', 'MUSIC', 'GAMES', 'EDUCATION', 'FINANCIAL', 'HEALTH', 'PRODUCTIVITY', 'BEAUTY', 'PET', 'OTHERS');

-- CreateEnum
CREATE TYPE "Cycle" AS ENUM ('MENSAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL');

-- CreateEnum
CREATE TYPE "Duration" AS ENUM ('MES', 'TRIMESTRE', 'SEMESTRE', 'ANO', 'SEMPRE');

-- CreateEnum
CREATE TYPE "Reminder" AS ENUM ('NUNCA', 'MESMO_DIA', 'DIAS', 'SEMANAS', 'MESES', 'ANO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "currency" TEXT,
    "payMethods" TEXT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT E'ENTERTAINMENT',
    "color" TEXT,
    "default" BOOLEAN NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "payMethod" TEXT NOT NULL,
    "payday" TIMESTAMP(3) NOT NULL,
    "cycle" "Cycle" NOT NULL DEFAULT E'MENSAL',
    "duration" "Duration" NOT NULL DEFAULT E'MES',
    "reminder" "Reminder" NOT NULL DEFAULT E'MESMO_DIA',
    "currency" TEXT NOT NULL,
    "shared" BOOLEAN NOT NULL,
    "people" JSONB NOT NULL,
    "serviceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_name_email_idx" ON "users"("name", "email");

-- CreateIndex
CREATE INDEX "services_name_type_idx" ON "services"("name", "type");

-- CreateIndex
CREATE INDEX "subscriptions_serviceId_userId_idx" ON "subscriptions"("serviceId", "userId");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
