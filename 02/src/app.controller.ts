import {Controller, Get} from '@nestjs/common'

@Controller('/as')
class AppController {

    @Get('/hi')
    getRootRoute(){
        return "Hello, There!";
    }
}


export {AppController}