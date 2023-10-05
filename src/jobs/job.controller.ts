import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDTO } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@Controller('jobs')
export class JobController{
    constructor(private readonly jobService: JobService){}

    @Post()
    createJob(@Body() createJobDto: CreateJobDTO){
        return this.jobService.createJob(createJobDto);
    }

    @Get()
    getJobs(){
        return this.jobService.getAllJobs();
    }

    @Get('fulltime')
    getfulltimeJobs(){
        return this.jobService.getFulltimejob();
    }

    @Get(":id")
    getJobsById(@Param("id") id: string){
        return this.jobService.getJobById(id);
    }

    @Put(":id")
    updateJob(@Param("id") id: string, @Body() updateJobDto: UpdateJobDto){
        return this.jobService.updateJob(id, updateJobDto);
    }

    @Delete(":id")
    deleteJob(@Param("id") id: string){
        return this.jobService.deleteJob(id);
    }

}