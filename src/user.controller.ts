import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";

let UserArr = [];

@Controller('/users')
export class UserController {
   
    @Post()
    addUser(@Body() userDTO: UserDTO){
        UserArr.push(userDTO);
        return 'User Added...';
    }

    @Get()
    getUser(){
        return UserArr;
    }

    @Get(':id')
    getUserById(@Param('id') id: number){
        return UserArr.find((user) => user.id === +id);
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() userDTO : UserDTO){
        let userIdx = UserArr.findIndex((user) => user.id === +id);
        UserArr[userIdx] = UserArr.push(userDTO);
        return UserArr;
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number){
        UserArr = UserArr.filter((user) => user.id !== +id);
        return "Deleted...";
    }
}