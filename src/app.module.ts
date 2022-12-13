import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmConfigService } from './common/config/typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `./src/common/config/env/.${process.env.NODE_ENV.trim()}.env`,
});

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [AuthModule],
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: process.env.GRAPH_PLAYGROUND === 'true' ? true : false,
      context: ({ req }) => ({ req }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./src/common/config/env/.${process.env.NODE_ENV}.env`,
    }),
    AuthModule,
  ],
})
export class AppModule {}
