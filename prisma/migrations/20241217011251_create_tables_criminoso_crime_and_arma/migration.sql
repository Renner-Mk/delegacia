-- CreateTable
CREATE TABLE "criminosos" (
    "id" UUID NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criminosos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crimes" (
    "id" UUID NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "data_crime" TIMESTAMP(3) NOT NULL,
    "criminosoId" UUID NOT NULL,

    CONSTRAINT "crimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "armas" (
    "id" UUID NOT NULL,
    "tipo" VARCHAR(60) NOT NULL,
    "numero_serie" VARCHAR(60) NOT NULL,
    "crimeId" UUID NOT NULL,

    CONSTRAINT "armas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "armas_numero_serie_key" ON "armas"("numero_serie");

-- AddForeignKey
ALTER TABLE "crimes" ADD CONSTRAINT "crimes_criminosoId_fkey" FOREIGN KEY ("criminosoId") REFERENCES "criminosos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "armas" ADD CONSTRAINT "armas_crimeId_fkey" FOREIGN KEY ("crimeId") REFERENCES "crimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
