package com.ssafy.auth_service.auth.controller;


import com.ssafy.auth_service.auth.AuthTokens;
import com.ssafy.auth_service.auth.gitlab.GitLabLoginParams;
import com.ssafy.auth_service.auth.service.OAuthLoginService;
import com.ssafy.auth_service.common.exception.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final OAuthLoginService oAuthLoginService;

    @PostMapping("")
    public ApiResponse<AuthTokens> loginGitLab(@RequestBody GitLabLoginParams params, HttpServletResponse response) {
        AuthTokens authTokens = oAuthLoginService.login(params);
        System.out.println(params.getAuthorizationCode());
        response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + authTokens.getAccessToken());
        response.addHeader("Refresh-Token", "Bearer " + authTokens.getRefreshToken());
        return ApiResponse.ok(authTokens);
    }

    // GitLab OAuth callback endpoint
    @GetMapping("/callback")
    public void gitLabCallback(
            @RequestParam("code") String authorizationCode,
            @RequestParam("state") String state,
            HttpServletResponse response) throws IOException {

        // GitLabLoginParams 객체 생성 및 Authorization Code 설정
        GitLabLoginParams params = new GitLabLoginParams();
        params.setAuthorizationCode(authorizationCode);
        params.makeBody().add("code", authorizationCode);

        // Authorization Code를 사용해 Access Token을 요청
        AuthTokens authTokens = oAuthLoginService.login(params);
        // 프론트엔드의 /login 페이지로 Access Token을 쿼리 파라미터로 포함하여 리다이렉트
        String redirectUrl = String.format("https://goodidea.world/login?accessToken=%s&refreshToken=%s", authTokens.getAccessToken(), authTokens.getRefreshToken());
        response.sendRedirect(redirectUrl);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify() {
        return ResponseEntity.ok("New Access token");
    }
}