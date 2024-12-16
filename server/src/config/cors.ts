import { CorsOptions } from "cors";

export const corsConfig:CorsOptions={
    origin:function(origin,callback)
    {
        if(origin ===process.env.FRONTEND_URL || process.env.POSTMAN_URL)
           callback(null,true);
        else
          {
            callback(new Error('Error de cors'));
          }
            
            
        console.log(origin);
        
    }
}