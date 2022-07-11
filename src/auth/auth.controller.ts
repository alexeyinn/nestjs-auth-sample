import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/local/signup")
  sighupLocal() {}

  @Post("/local/signin")
  sighinLocal() {}

  @Post("/logout")
  logout() {}

  @Post("/refresh")
  refreshTokens() {}
}
