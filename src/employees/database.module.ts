/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('localhost'),
                port: configService.get('5432'),
                username: configService.get('postgres'),
                password: configService.get('root'),
                database: configService.get('nest_db'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule { }
