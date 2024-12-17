/*
  Warnings:

  - You are about to drop the column `name` on the `criminosos` table. All the data in the column will be lost.
  - Added the required column `nome` to the `criminosos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "criminosos" DROP COLUMN "name",
ADD COLUMN     "nome" VARCHAR(60) NOT NULL;
