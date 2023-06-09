import { Module } from "@nestjs/common";
import { KnexConfig } from "./knex.config";


@Module({
    imports:[],
    providers:[KnexConfig],
    exports:[KnexConfig]
})

export class KnexModule{}