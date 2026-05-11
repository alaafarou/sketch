import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { ConfigModule } from '@nestjs/config';
import { i18nCustomService } from './Utilis/i18n.Service';
import { GrpcMetadataResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['Config/dev.env', '.env'],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, 'i18n'),
        watch: process.env.I18N_WATCH === 'true',
      },
      resolvers: [{ use: GrpcMetadataResolver, options: ['acceptlangAccept-Language', 'x-lang'] }],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, i18nCustomService],
})
export class AuthModule {}
