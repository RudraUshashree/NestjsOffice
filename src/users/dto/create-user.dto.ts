import { Type } from 'class-transformer';
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator';
import { Account_Type } from 'src/constants/account.constant';
import { AddressDTO } from 'src/dto/address.dto';

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsString()
    @IsOptional()
    phone?: string;
    
    @IsEnum(Account_Type)
    accountType: Account_Type;

    @IsString({each: true})
    @IsOptional()
    social: string[];

    @Type(() => AddressDTO)
    @ValidateNested()
    @IsNotEmpty()
    address: AddressDTO;

    @IsOptional()
    metadata : Record<string, any>;
}