package com.jamie.destinytracker.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class BungieApiService {
    private final WebClient webClient;

    public BungieApiService(@Value("${bungie.api.key}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl("https://www.bungie.net/Platform")
                .defaultHeader("X-API-Key", apiKey)
                .build();
    }

    public String searchPlayer(String bungieName) {
        return webClient.get()
                .uri("/Destiny2/SearchDestinyPlayer/{membershipType}/{displayName}/")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
