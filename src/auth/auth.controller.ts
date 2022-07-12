import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { GetCurrentUser, GetCurrentUserId } from "src/common/decorators";
import { Public } from "src/common/decorators/public.decorators";
import { AtGuard, RtGuard } from "src/common/guards";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types/tokens.type";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("local/signup")
  @HttpCode(HttpStatus.CREATED)
  sighupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.sighupLocal(dto);
  }

  @Public()
  @Post("local/signin")
  @HttpCode(HttpStatus.OK)
  sighinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.sighinLocal(dto);
  }

  @UseGuards(AtGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser("refreshToken") refreshToken: string
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
