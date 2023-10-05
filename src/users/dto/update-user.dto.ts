import { Type } from 'class-transformer';
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator';
import { Account_Type } from 'src/constants/account.constant';
import { AddressDTO } from 'src/dto/address.dto';

export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString({each: true})
    @IsOptional()
    social?: string[];

    @Type(() => AddressDTO)
    @ValidateNested()
    address?: AddressDTO;
}