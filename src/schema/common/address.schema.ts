import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()   
export class Address{
    @Prop({required: true})
    address1: string;

    @Prop()
    address2?: string;

    @Prop()
    city?: string;

    @Prop()
    state?: string;

    @Prop({required: true})
    country: string;

    @Prop()
    zipcode?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);