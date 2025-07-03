package com.encapsulearn.quizApp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties(prefix = "app")
@Data
public class JwtProperties {
  private String jwtSecret;
  private long jwtExpirationMs;
}