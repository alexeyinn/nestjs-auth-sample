import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse, ApiHeader, ApiOkResponse } from "@nestjs/swagger";
import { Request } from "express";
import { GetCurrentUser, GetCurrentUserId } from "src/common/decorators";
import { Public } from "src/common/decorators/public.decorators";
import { AtGuard, RtGuard } from "src/common/guards";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { UserEntity } from "./entities";
import { Tokens } from "./types/tokens.type";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("local/signup")
  @ApiCreatedResponse({ type: Tokens })
  @HttpCode(HttpStatus.CREATED)
  sighupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.sighupLocal(dto);
  }

  @Public()
  @Post("local/signin")
  @ApiCreatedResponse({ type: Tokens })
  @ApiHeader({ name: "Authorization", description: "Access token" })
  @HttpCode(HttpStatus.OK)
  sighinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.sighinLocal(dto);
  }

  @UseGuards(AtGuard)
  @Post("logout")
  @ApiCreatedResponse({ description: "true" })
  @ApiHeader({ name: "Authorization", description: "Access token" })
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  @ApiCreatedResponse({ type: Tokens })
  @ApiHeader({ name: "Authorization", description: "Refresh token" })
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser("refreshToken") refreshToken: string
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
