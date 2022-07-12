import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types/tokens.type";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/local/signup")
  sighupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.sighupLocal(dto);
  }

  @Post("/local/signin")
  sighinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.sighinLocal(dto);
  }

  @Post("/logout")
  logout() {}

  @Post("/refresh")
  refreshTokens() {}
}
