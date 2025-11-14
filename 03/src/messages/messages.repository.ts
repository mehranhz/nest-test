import { Injectable } from '@nestjs/common'
import {readFile, writeFile} from 'fs/promises'

@Injectable()
export class MessagesRepository {
    async findOne(id: string){
        const content = await readFile('./messages.json', 'utf8')
        const messages = JSON.parse(content)

        return messages[id]
    }

    async findAll(){
        const content = await readFile('./messages.json', 'utf8')
        const messages = JSON.parse(content)

        return messages
    }

    async create(content: string){
        const contents = await readFile('./messages.json', 'utf8')
        let messages = JSON.parse(contents)

        messages = {
            ...messages,
           [ Math.random() * 1000000]: content   
        }

        console.log(content)
        writeFile('messages.json',JSON.stringify(messages))


        return messages
    }
}