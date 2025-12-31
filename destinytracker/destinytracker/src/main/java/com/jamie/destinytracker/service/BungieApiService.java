package com.jamie.destinytracker.service;

import com.jamie.destinytracker.dto.BungieNameSearchRequest;
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

    public String searchByBungieName(String name, int code) {
        BungieNameSearchRequest body = new BungieNameSearchRequest(name, code);

        return webClient.post()
                .uri("/Destiny2/SearchDestinyPlayerByBungieName/{membershipType}/", -1)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
