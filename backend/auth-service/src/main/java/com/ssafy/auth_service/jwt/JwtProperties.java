package com.ssafy.auth_service.jwt;

public interface JwtProperties {


    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
    String HEADER_REFRESH = "Refresh-Token";
}