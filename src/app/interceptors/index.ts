import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenCheckInterceptor } from "./token-check.interceptor";

export const httpInterceptorProviders=[
  { provide: HTTP_INTERCEPTORS, useClass: TokenCheckInterceptor, multi: true }
]