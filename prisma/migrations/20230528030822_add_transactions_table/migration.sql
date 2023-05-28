-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "account_from_id" TEXT NOT NULL,
    "account_to_id" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_from_id_fkey" FOREIGN KEY ("account_from_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_to_id_fkey" FOREIGN KEY ("account_to_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
