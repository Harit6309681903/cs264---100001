package com.example.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all endpoints
                .allowedOrigins("http://localhost:3000", "http://node-server:3000", "http://localhost:8080", "https://restapi.tu.ac.th/api/v1/auth/Ad/verify") // Allow only requests from these origins
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow these HTTP methods
                .allowedHeaders("*"); // Allow all headers
    }
}