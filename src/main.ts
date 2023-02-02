import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CanLogger } from './core/logger/logger.service';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { CanAuthGuard } from './core/auth/auth.guard';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CanContextService, CanPermissionsGuard } from '@can/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseTransformerInterceptor } from './core/interceptors/response-transformer.interceptor';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';

/**
 * Boot the App
 */
bootstrap();

async function bootstrap() {
  // Create App Instance
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable Cors
  app.enableCors();
  // Set Static Assests For MVC
  app.useStaticAssets(join(__dirname, '..', 'src', 'browser', 'public'));
  // Set Template Store Default Directory
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'browser', 'views'));
  // Set View Engine
  app.setViewEngine('hbs');
  // Set Global API Path Prefix
  app.setGlobalPrefix('/v1');
  // Use Custom Logger instead of Default Logger
  app.useLogger(new CanLogger());
  // Add Global Filters to Parse the errors
  app.useGlobalFilters(new HttpExceptionFilter());
  // Add Global Interceptor to Parse the Response Format
  app.useGlobalInterceptors(new ResponseTransformerInterceptor());
  // Add Global Authentication to Every Routes
  // app.useGlobalGuards(new CanAuthGuard());
  // Add Global Role Authorization to Every Routes
  // app.useGlobalGuards(new CanPermissionsGuard());
  // Set The HTTP Secure Header for vulnerabilities
  app.use(helmet());
  // Get Config Service
  const configService = app.get(ConfigService);
  // Cookie Parser
  app.use(cookieParser(configService.get('COOKIE_PARSER_SECRET')));
  // Initialize Can Context Service
  CanContextService.init(app);
  // Swagger Configuration
  const options = new DocumentBuilder()
    .setTitle('Prodo API')
    .setDescription('Prodo API description')
    .setVersion('1.0')
    .addTag('Prodo')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v1', app, document);

  // Start App
  await app.listen(parseInt(configService.get('PORT')));
}
