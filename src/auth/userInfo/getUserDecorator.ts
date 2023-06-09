import { createParamDecorator } from '@nestjs/common';


export const CurrentUser = createParamDecorator((data, ctx) => {    
    const req =ctx.switchToHttp().getRequest();        
    
    return req.user;
})

