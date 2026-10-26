import { Module } from "@nestjs/common";
import { RolesGaurd } from "./roles.guard";

@Module({
    providers:[RolesGaurd],
    controllers:[RolesGaurd],
    exports:[]
})
export class AuthModule{}