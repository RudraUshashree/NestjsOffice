import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Address, AddressSchema } from "../common/address.schema";
import { JOB_TYPE } from "src/constants/job.constant";
import { Types } from "mongoose";
import { USER_MODEL, User } from "../user/user.schema";

@Schema()
export class Job {
    @Prop({type: Types.ObjectId, ref: USER_MODEL, required: true})
    employeer: Types.ObjectId;

    @Prop({required: true})
    companyname: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    experience: number;

    @Prop({default: []})
    tags?: string[];

    @Prop()
    salary?: string;

    @Prop({
        type: String,
        enum: Object.keys(JOB_TYPE),
        required: true
    })
    type:JOB_TYPE

    @Prop({type: AddressSchema, required: true})
    location: Address;
}

export const JOB_MODEL = Job.name;
export type JobDocument = Job & Document;
export const JobSchema = SchemaFactory.createForClass(Job);

JobSchema.plugin(require("mongoose-autopopulate"));

function populateMiddleware (next: Function){
    this.populate({path: "employeer", select: {name: 1}});
    next();
}

JobSchema.pre("findOne", populateMiddleware);
JobSchema.pre("find", populateMiddleware);

