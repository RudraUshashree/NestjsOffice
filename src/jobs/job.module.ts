import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JobService } from "./job.service";
import { JOB_MODEL, JobSchema } from "src/schema/job/job.schema";
import { UserService } from "src/users/user.service";

@Module({
    imports: [],
    providers: [JobService,UserService],
    exports: [JobService]
})
export class JobModule {
}