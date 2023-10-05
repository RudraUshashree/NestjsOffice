import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { USER_MODEL, UserDocument } from "src/schema/user/user.schema";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { LoginDTO } from "./dto/login.dto";
import { compare } from "bcrypt";

@Injectable()
export class UserService{
    constructor(@InjectModel(USER_MODEL) private readonly usermodel: Model<UserDocument>){}

    async createUser(createUserDto: CreateUserDTO){
        try {
            const newUser = await this.usermodel.create(createUserDto);
            return newUser;

        } catch (error) {
            if(error.name === "ValidationError"){
                throw new BadRequestException(error.errors);
            }

            throw new ServiceUnavailableException();
        }
    }

    async loginUser(loginDto: LoginDTO){
        const {email, password} = loginDto;
        const user = await this.usermodel.findOne({email}, "+password");

        if(!user){
            throw new NotFoundException("User not found...");
        }

        const isPwdMatched = await compare(password, user.password);

        if(!isPwdMatched){
            throw new UnauthorizedException();
        }
        return user;

    }

    async getAllUsers(){
        const userData = await this.usermodel.find();
        return userData;
    }

    async searchByName(name: string){
        const searchedData = this.usermodel.find({name : new RegExp(name, "i")});
        return searchedData;
    }

    async getUserById(id:string){
        const userData = await this.usermodel.findById(id);
        if(!userData){
            throw new NotFoundException("User not found with this id")
        }
        return userData;
    }

    async updateUser(id:string, userDTO: UpdateUserDTO){
        const userData = await this.usermodel.findByIdAndUpdate(id, userDTO, {new: true});
        if(!userData){
            throw new NotFoundException("User not found with this id")
        }
        return userData;
    }

    async deleteUser(id:string){
        const userData = await this.usermodel.findByIdAndDelete(id);
        if(!userData){
            throw new NotFoundException("User not found with this id")
        }
        return "Deleted Successfully...";
    }

}

