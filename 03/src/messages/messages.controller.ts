import { Controller, Get, Post, Delete, Patch, Param, Body, Query, Req, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import {CreateMessageDTO} from './dtos/create-message.dto'
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    messagesService: MessagesService
    constructor(){
        this.messagesService = new MessagesService()
    }

    @Get()
    findAll(){
        return this.messagesService.findAll()
    }

    @Post()
    create(@Body() body: CreateMessageDTO){
        return this.messagesService.create(body.content)
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
    async findOne(@Param('id') id:string, @Req() request: Request){
        const message = await this.messagesService.findOne(id)

        if(!message){
            throw new NotFoundException("message not found")
        }

        return message
    }

    }
