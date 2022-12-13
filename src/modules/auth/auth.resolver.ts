import { Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AccessTokenType, GetUserType } from './types';
import { SignInInput } from './inputs/sign-in.input';
import { SignUpInput } from './inputs/sign-up.input';
import { GqlAuthGuard } from 'src/common/guards/gqlAuthGuard.guard';
import { GetCurrentUserId } from 'src/common/decorators';
import { EditUserInput } from './inputs/edit-user.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessTokenType)
  signUp(
    @Args('signUpInput') signUpInput: SignUpInput,
    @Res({ passthrough: true }) response: Response
  ): Promise<AccessTokenType> {
    return this.authService.signUpLocal(signUpInput, response);
  }

  @Mutation(() => AccessTokenType)
  signIn(
    @Args('signInInput') signInInput: SignInInput,
    @Res({ passthrough: true }) response: Response
  ): Promise<AccessTokenType> {
    return this.authService.signInLocal(signInInput, response);
  }

  @Query(() => GetUserType)
  @UseGuards(GqlAuthGuard)
  getUser(@GetCurrentUserId() userId): Promise<GetUserType> {
    return this.authService.getUser(userId);
  }

  @Mutation(() => GetUserType)
  @UseGuards(GqlAuthGuard)
  editUser(
    @Args('editUserInput') editUserInput: EditUserInput,
    @GetCurrentUserId() userId
  ): Promise<GetUserType> {
    return this.authService.editUser(userId, editUserInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  logout(@GetCurrentUserId() userId): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Mutation(() => AccessTokenType)
  refreshTokens(
    @Context() context,
    @Res({ passthrough: true }) response: Response
  ): Promise<AccessTokenType> {
    return this.authService.refreshTokens(context, response);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  uploadAvatar(
    @GetCurrentUserId() userId,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload
  ): Promise<string> {
    return this.authService.uploadAvatar(userId, createReadStream);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeAvatar(@GetCurrentUserId() userId): Promise<boolean> {
    return this.authService.removeAvatar(userId);
  }
}
