import { Inject, Injectable } from "@nestjs/common/decorators";
import { KnexConfig } from "src/knex/knex.config";

@Injectable()
export class AuthRepository{
    @Inject()
    private readonly knexConfig:KnexConfig;

    getOne(user){
        const knex = this.knexConfig.instance;
        let {email,password} = user
        return knex.select('*').returning("*").from("admin").where({email,password})
    }
    
    register(user){
        const knex = this.knexConfig.instance;
        return knex("users").returning("*").insert(user)
    }

    login(user){
        const knex = this.knexConfig.instance;
        let {email,password} = user
               
        return knex.select('*').from('users').where({email,password});
    }
}