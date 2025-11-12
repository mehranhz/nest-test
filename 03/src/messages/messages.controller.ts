import { Controller, Get, Post, Delete, Patch, Param, Body, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('messages')
export class MessagesController {

    @Get()
    findAll(){
        return "come and get all messages"
    }

    @Post()
    create(@Body() body: any){
        return `We've added a message with text: ${body.content} to messages list`;
    }

    @Delete()
    remove(){
        return 'This action removes a message';
    }

    @Patch()
    update(){
        return 'This action updates a message';
    }

    @Get(':id')
    findOne(@Param('id') id:string, @Req() request: Request){
        return {
            message: 'all query params',
            query: request.query
        };
    }

    }
