-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "image" TEXT[] DEFAULT ARRAY[]::TEXT[];
