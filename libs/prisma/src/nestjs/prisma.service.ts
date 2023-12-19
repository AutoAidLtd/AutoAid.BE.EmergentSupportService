import { Inject, Injectable, OnModuleInit, Optional } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaServiceOptions } from "./interfaces/prisma-module-options.interface";
import { PRISMA_SERVICE_OPTIONS } from "./prisma.constants";


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    constructor(
        @Optional()
        @Inject(PRISMA_SERVICE_OPTIONS)
        private readonly prismaServiceOptions: PrismaServiceOptions = {},
    ){
        super()
    }
    async onModuleInit() {
        if (this.prismaServiceOptions.explicitConnect) {
          await this.$connect();
        }
      }

}