import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   console.log(app);
	// app.use((req,res,next)=>{
	// 	res.setHeader('Access-Control-Allow-Origin','*');
	// 	res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
	// 	res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
	// 	next(); 
	// })
	
	app.enableCors();
	await app.listen(4200);
}
bootstrap();
