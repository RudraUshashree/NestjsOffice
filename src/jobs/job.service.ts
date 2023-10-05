import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account_Type } from "src/constants/account.constant";
import { JOB_MODEL, JobDocument } from "src/schema/job/job.schema";
import { UserService } from "src/users/user.service";
import { CreateJobDTO } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@Injectable()
export class JobService{
    constructor(
        @InjectModel(JOB_MODEL)private readonly jobmodel: Model<JobDocument>,
        private readonly userService: UserService
    ){}

    async createJob(createJobDto: CreateJobDTO){
        const jobData = await this.userService.getUserById(createJobDto.userId);

        if(!jobData){
            throw new NotFoundException("Job not found");
        }else if(jobData.accountType !== Account_Type.Employee){
            throw new ForbiddenException("Only employee can create a job");
        }

        const job = await this.jobmodel.create({...createJobDto, employeer: jobData._id});
        return job;
    }

    async getAllJobs(){
        const jobData = await this.jobmodel.find().select({__v:0});
        if(!jobData){
            throw new NotFoundException("Jobs not found");
        }
        return jobData;
    }   

    async getFulltimejob(){
        const jobData = await this.jobmodel.find().where({type: "Full_Time"});
        if(!jobData){
            throw new NotFoundException("Full_Time Job not found");
        }
        return jobData;
    }

    async getJobById(id: string){
        const jobData = await this.jobmodel.findById(id);
        if(!jobData){
            throw new NotFoundException("Job not found");
        }
        return jobData;
    }

    async updateJob(id: string, updateJobDto: UpdateJobDto){
            const jobData = await this.jobmodel.findByIdAndUpdate(id,updateJobDto, {new: true});
            if(!jobData){
                throw new NotFoundException("Job not found");
            }
            return jobData;
        
    }  

    async deleteJob(id: string){
        const jobData = await this.jobmodel.findByIdAndDelete(id);
        if(!jobData){
            throw new NotFoundException("Job not found");
        }
        return "Deleted Succesfully...";
    }  

}
