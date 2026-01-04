package com.jamie.destinytracker.service;

import com.jamie.destinytracker.dto.BungieNameSearchRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

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
    public String getProfile(int membershipType, String membershipId) {
        return webClient.get()
                .uri("/Destiny2/{membershipType}/Profile/{membershipId}/?components=100,200",
                        membershipType, membershipId)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
    /**
     * Calls Bungie's Get Character endpoint and returns the raw response.
     */
    public Map<String, Object> getCharacter(int membershipType, String membershipId, String characterId) {
        // Retrieves equipment, item instances, item stats, and item sockets
        return webClient.get()
                .uri("/Destiny2/{membershipType}/Profile/{membershipId}/Character/{characterId}/" +
                        "?components=201,205,300,302", membershipType, membershipId, characterId)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String,Object>>(){})
                .block();
    }
}
