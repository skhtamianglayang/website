-- CreateTable
CREATE TABLE "HeroBanner" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroBanner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HeroBanner_page_order_key" ON "HeroBanner"("page", "order");
