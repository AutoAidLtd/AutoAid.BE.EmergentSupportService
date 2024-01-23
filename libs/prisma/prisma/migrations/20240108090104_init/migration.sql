-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "app";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ids";

-- CreateTable
CREATE TABLE "ids"."account" (
    "account_id" SERIAL NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_user" INTEGER NOT NULL,
    "updated_user" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "username" VARCHAR(50) NOT NULL,
    "hash_password" VARCHAR,
    "email" VARCHAR,
    "phone_number" VARCHAR(15),
    "access_token" VARCHAR,
    "exp_access_token" TIMESTAMP(6),
    "refresh_token" VARCHAR,
    "exp_refresh_tokenn" TIMESTAMP(6),

    CONSTRAINT "account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "app"."customer" (
    "customer_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100),
    "phone_number" VARCHAR(20),
    "address" TEXT,
    "date_of_birth" DATE,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "app"."emergent_request" (
    "emergent_request_id" SERIAL NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_user" INTEGER,
    "updated_user" INTEGER,
    "is_deleted" BOOLEAN DEFAULT false,
    "remark" VARCHAR(255),
    "vehicle_id" INTEGER,
    "customer_id" INTEGER NOT NULL,
    "garage_id" INTEGER,
    "place_id" INTEGER NOT NULL,
    "room_uid" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "emergent_request_pkey" PRIMARY KEY ("emergent_request_id")
);

-- CreateTable
CREATE TABLE "app"."event_type" (
    "event_type_id" SERIAL NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_user" INTEGER NOT NULL,
    "updated_user" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "event_name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "event_type_pkey" PRIMARY KEY ("event_type_id")
);

-- CreateTable
CREATE TABLE "app"."garage" (
    "garage_id" SERIAL NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_user" INTEGER NOT NULL,
    "updated_user" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "avatar_url" VARCHAR,
    "email" VARCHAR,
    "address" VARCHAR,
    "introduction" VARCHAR,
    "introduction_url" VARCHAR[],
    "owner_id" VARCHAR,
    "place_id" INTEGER NOT NULL,

    CONSTRAINT "garage_pkey" PRIMARY KEY ("garage_id")
);

-- CreateTable
CREATE TABLE "app"."garage_account" (
    "garage_account_id" SERIAL NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_user" INTEGER NOT NULL,
    "updated_user" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "garage_id" INTEGER NOT NULL,
    "account_id" INTEGER NOT NULL,
    "is_primary_account" BOOLEAN,

    CONSTRAINT "garage_account_pkey" PRIMARY KEY ("garage_account_id")
);

-- CreateTable
CREATE TABLE "app"."garage_service" (
    "garage_service_id" SERIAL NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_user" INTEGER NOT NULL,
    "updated_user" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "service_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2),
    "garage_id" INTEGER NOT NULL,

    CONSTRAINT "garage_service_pkey" PRIMARY KEY ("garage_service_id")
);

-- CreateTable
CREATE TABLE "app"."place" (
    "place_id" SERIAL NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_user" INTEGER NOT NULL,
    "updated_user" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "place_pkey" PRIMARY KEY ("place_id")
);

-- CreateTable
CREATE TABLE "app"."service_schedule" (
    "service_schedule_id" SERIAL NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_user" INTEGER NOT NULL,
    "updated_user" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "vehicle_id" INTEGER NOT NULL,
    "check_in_time" TIMESTAMP(6) NOT NULL,
    "check_out_time" TIMESTAMP(6) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2),
    "garage_id" INTEGER NOT NULL,
    "service_schedule_status" VARCHAR(50) NOT NULL,

    CONSTRAINT "service_schedule_pkey" PRIMARY KEY ("service_schedule_id")
);

-- CreateTable
CREATE TABLE "app"."spare_part" (
    "spare_part_id" SERIAL NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_user" INTEGER NOT NULL,
    "updated_user" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "part_name" VARCHAR(255) NOT NULL,
    "part_number" VARCHAR(50),
    "manufacturer" VARCHAR(100),
    "quantity_in_stock" INTEGER,
    "unit_price" DECIMAL(10,2),
    "spare_part_category_id" INTEGER,

    CONSTRAINT "spare_part_pkey" PRIMARY KEY ("spare_part_id")
);

-- CreateTable
CREATE TABLE "app"."spare_part_category" (
    "spare_part_category_id" SERIAL NOT NULL,
    "created_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_user" INTEGER NOT NULL,
    "updated_user" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "category_name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "spare_part_category_pkey" PRIMARY KEY ("spare_part_category_id")
);

-- CreateTable
CREATE TABLE "app"."vehicle" (
    "vehicle_id" SERIAL NOT NULL,
    "make" VARCHAR(50) NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "est_year" TIMESTAMP(6) NOT NULL,
    "color" VARCHAR(30),
    "owner_id" INTEGER NOT NULL,
    "purchase_date" DATE,
    "mileage" INTEGER,
    "engine_number" VARCHAR(50),
    "chassis_number" VARCHAR(50),

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "app"."customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "spare_part_part_number_key" ON "app"."spare_part"("part_number");

-- AddForeignKey
ALTER TABLE "app"."customer" ADD CONSTRAINT "customer_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "ids"."account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app"."emergent_request" ADD CONSTRAINT "emergent_request_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "app"."customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app"."emergent_request" ADD CONSTRAINT "emergent_request_garage_id_fkey" FOREIGN KEY ("garage_id") REFERENCES "app"."garage"("garage_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app"."emergent_request" ADD CONSTRAINT "emergent_request_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "app"."place"("place_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app"."garage" ADD CONSTRAINT "garage_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "app"."place"("place_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app"."garage_account" ADD CONSTRAINT "garage_account_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "ids"."account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app"."garage_account" ADD CONSTRAINT "garage_account_garage_id_fkey" FOREIGN KEY ("garage_id") REFERENCES "app"."garage"("garage_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app"."garage_service" ADD CONSTRAINT "garage_service_garage_id_fkey" FOREIGN KEY ("garage_id") REFERENCES "app"."garage"("garage_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app"."service_schedule" ADD CONSTRAINT "service_schedule_garage_id_fkey" FOREIGN KEY ("garage_id") REFERENCES "app"."garage"("garage_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app"."service_schedule" ADD CONSTRAINT "service_schedule_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "app"."vehicle"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app"."spare_part" ADD CONSTRAINT "spare_part_spare_part_category_id_fkey" FOREIGN KEY ("spare_part_category_id") REFERENCES "app"."spare_part_category"("spare_part_category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "app"."vehicle" ADD CONSTRAINT "vehicle_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "app"."customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "app"."garage"
ADD COLUMN "name" VARCHAR(255);

-- CreateTable
CREATE TABLE "app"."notification" (
  "uuid" UUID NOT NULL,
  "content" TEXT,
  "title" VARCHAR(255),
  "noti_type" VARCHAR(50),
  "send_time" TIMESTAMP(6),
  "receive_id" INTEGER,
  "created_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "notification_pkey" PRIMARY KEY ("uuid")
);


  ALTER TABLE "app"."notification" ADD CONSTRAINT "notification_receive_id_fkey" FOREIGN KEY ("receive_id") REFERENCES "ids"."account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE "app"."chat_channel" (
  "channel_id" SERIAL NOT NULL,
  "channel_name" VARCHAR(255) NOT NULL,
  "created_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "chat_channel_pkey" PRIMARY KEY ("channel_id")
);

CREATE TABLE "app"."message" (
  "message_id" SERIAL NOT NULL,
  "channel_id" INTEGER NOT NULL,
  "sender_id" INTEGER NOT NULL,
  "content" TEXT NOT NULL,
  "created_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "message_pkey" PRIMARY KEY ("message_id"),
  CONSTRAINT "message_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "app"."chat_channel"("channel_id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "app"."participant" (
  "participant_id" SERIAL NOT NULL,
  "channel_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL,
  "joined_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "participant_pkey" PRIMARY KEY ("channel_id","user_id"),
  CONSTRAINT "participant_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "app"."chat_channel"("channel_id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "participant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app"."account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE
);
