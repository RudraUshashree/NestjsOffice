import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { USER_MODEL, UserSchema } from "src/schema/user/user.schema";

@Module({
    imports: [],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {

}