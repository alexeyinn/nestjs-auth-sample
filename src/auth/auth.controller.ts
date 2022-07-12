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
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types/tokens.type";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("local/signup")
  @HttpCode(HttpStatus.CREATED)
  sighupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.sighupLocal(dto);
  }

  @Post("local/signin")
  @HttpCode(HttpStatus.OK)
  sighinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.sighinLocal(dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user["id"]);
  }

  @UseGuards(AuthGuard("jwt-refresh"))
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens() {}
}
