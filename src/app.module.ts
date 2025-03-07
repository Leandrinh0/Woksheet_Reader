import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseConfig } from './configs/typeorm.config';
import { CarriersModule } from './carriers/carriers.module';
import { FieldsModule } from './fields/fields.module';
import { ReadingPatternModule } from './reading-pattern/reading-pattern.module';
import { FieldsValuesModule } from './fields-values/fileds-values.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConfig,
      inject: [DataBaseConfig]
    }),
    CarriersModule,
    FieldsModule,
    ReadingPatternModule,
    FieldsValuesModule
  ],
})
export class AppModule { }
