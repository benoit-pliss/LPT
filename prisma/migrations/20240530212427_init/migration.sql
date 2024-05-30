-- AlterTable
ALTER TABLE "Sessions" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Times" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ALTER COLUMN "id_session" DROP NOT NULL,
ALTER COLUMN "id_session" DROP DEFAULT,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
