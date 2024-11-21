package com.ssafy.gateway_service.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    @LoadBalanced  // LoadBalancer 통합
    public WebClient.Builder loadBalancedWebClientBuilder() {
        return WebClient.builder();
    }
}
