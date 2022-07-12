import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/local/signup")
  sighupLocal(@Body() dto: AuthDto) {
    return this.authService.sighupLocal(dto);
  }

  @Post("/local/signin")
  sighinLocal() {}

  @Post("/logout")
  logout() {}

  @Post("/refresh")
  refreshTokens() {}
}
