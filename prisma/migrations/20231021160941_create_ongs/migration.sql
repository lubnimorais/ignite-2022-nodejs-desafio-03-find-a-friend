-- CreateTable
CREATE TABLE "ongs" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "postal_code" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "whatsapp_number" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "city" VARCHAR NOT NULL,
    "state" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ongs_pkey" PRIMARY KEY ("id")
);
