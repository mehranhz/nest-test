import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { join } from 'path';

@Module({
  imports: [ReportsModule, UsersModule,TypeOrmModule.forRoot({
    type: 'sqljs',
    autoSave: true,
    synchronize: true,
    location: 'database.sqlite',   // <--- This is the output file
    entities: [User, Report],
    sqlJsConfig: {
      locateFile: (fileName) => join(__dirname, '..', 'node_modules', 'sql.js', 'dist', fileName),
    },
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
