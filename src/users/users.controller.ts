import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { LoginDTO } from "./dto/login.dto";

@Controller('user')
export class UsersController{

    constructor(private readonly userService:UserService){}

    @Post()
    addUser(@Body() UserDto: CreateUserDTO){
        return this.userService.createUser(UserDto);
    }

    @Post("login")
    loginUser(@Body() loginDto: LoginDTO){
        return this.userService.loginUser(loginDto);
    }

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Get("search")
    searchName(@Query("name") name: string){
        return this.userService.searchByName(name);
    }

    @Get(":id")
    getUserById(@Param("id") id: string){
        return this.userService.getUserById(id);
    }

    @Patch(":id")
    updateUser(@Param("id") id: string, @Body() UserDto: UpdateUserDTO){
        return this.userService.updateUser(id, UserDto);
    }

    @Delete(":id")
    deleteUser(@Param("id") id:string){
        return this.userService.deleteUser(id);
    }
}