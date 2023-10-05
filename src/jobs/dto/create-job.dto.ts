import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { JOB_TYPE } from "src/constants/job.constant";
import { AddressDTO } from "src/dto/address.dto";
import { Address } from "src/schema/common/address.schema";

export class CreateJobDTO{
    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsOptional()
    companyname?: string;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    experience: number;

    @IsString({each:true})
    @IsOptional()
    tags?: string[];

    @IsString()
    @IsOptional()
    salary?: string;

    @IsEnum(JOB_TYPE)
    @IsOptional()
    type:JOB_TYPE

    @Type(()=> AddressDTO)
    @ValidateNested()
    @IsOptional()
    location: Address;
}
