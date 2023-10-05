import { Schema, Prop, raw, SchemaFactory } from "@nestjs/mongoose";
import { Account_Type, Account_status } from "src/constants/account.constant";
import { Address, AddressSchema } from "../common/address.schema";
import { hash } from "bcrypt";

@Schema({
    timestamps: true
})
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true, select: false})
    password: string;

    @Prop()
    age?: number;

    @Prop()
    phone?: string;

    @Prop({
        type: String,
        enum: Object.keys(Account_status),
        default: Account_status.Active
    })
    status?: Account_status;
    
    @Prop({
        type: String,
        enum: Object.keys(Account_Type),
        immutable: true,
        required: true
    })
    accountType: Account_Type;

    @Prop({ default: [] })
    social: string[];

    @Prop({ default: false})
    isEmailVerified: boolean;

    @Prop({type: AddressSchema, required: true})
    address: Address;

    @Prop(
        raw({
            reference: {type: String},
            beta: {type: String}
        })
    )
    metadata : Record<string, any> | any;
}

export const USER_MODEL = User.name;   //Its give User
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

async function bcryptUserPassword(next: Function){
    const hashedPwd = await hash(this.password, 10);
    this.password = hashedPwd;
    next();
}

UserSchema.pre("save", bcryptUserPassword);