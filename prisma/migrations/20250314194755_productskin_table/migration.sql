-- CreateTable
CREATE TABLE "ProductSkin" (
    "productId" UUID NOT NULL,
    "skinId" UUID NOT NULL,
    "dropChance" DECIMAL(5,2) NOT NULL DEFAULT 0,

    CONSTRAINT "ProductSkin_pkey" PRIMARY KEY ("productId","skinId")
);

-- AddForeignKey
ALTER TABLE "ProductSkin" ADD CONSTRAINT "ProductSkin_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSkin" ADD CONSTRAINT "ProductSkin_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
