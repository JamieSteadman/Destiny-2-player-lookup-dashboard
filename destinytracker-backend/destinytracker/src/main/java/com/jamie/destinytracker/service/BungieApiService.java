package com.jamie.destinytracker.service;

import com.jamie.destinytracker.dto.BungieNameSearchRequest;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@Service
public class BungieApiService {
    private final WebClient webClient;
    private JsonNode itemDefs;

    public BungieApiService(@Value("${bungie.api.key}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl("https://www.bungie.net/Platform")
                .defaultHeader("X-API-Key", apiKey)
                .build();
    }

    @PostConstruct
    public void init() {
        downloadItemDefsToDisk();
        // Fills the itemDefBytes array with the item defs JSON file
        Path path = Paths.get("data/DestinyInventoryItemDefinition.json");
        try {
            ObjectMapper mapper = new ObjectMapper();
            byte [] itemDefBytes = Files.readAllBytes(path);
            itemDefs = mapper.readTree(itemDefBytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
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

    // Takes the contents of the item definition file and returns a JsonNode
    public String getItemIconPath(String itemHash) {
        // Stores the contents of the data file into the jsonBytes array
        // Parses the JSON text into relevant JsonNode objects

        JsonNode itemNode = itemDefs.get(itemHash); // Gets JSON node attached to the specific item hash
        String iconPath = itemNode.get("displayProperties").get("icon").asText(); // Retrieves icon path as String
        return iconPath;
    }

    // Downloads the item properties to disk from the URL provided in the manifest
    public void downloadItemDefsToDisk() {
        // Path from Destiny Manifest response to item definitions file
        String itemDefPath = "https://www.bungie.net/common/destiny2_content/json/en/" +
                "DestinyInventoryItemDefinition-53c99f00-7f5c-424e-b9ad-367ed50e3ab6.json";

        Path outputPath = Paths.get("data/DestinyInventoryItemDefinition.json");

        // Prevent redownloading the same file every time
        if (Files.exists(outputPath)) {
            return;
        }
        try {
            Files.createDirectories(outputPath.getParent());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // Writes item definition file directly to the output path, one chunk at a time
        DataBufferUtils.write(
                webClient.get()
                        .uri(itemDefPath)
                        .retrieve()
                        .bodyToFlux(org.springframework.core.io.buffer.DataBuffer.class)
                , outputPath
        ).block();
    }

    // Return Destiny 2 manifest in JSON format
    public String getManifest() {
        String manifestUrl = "https://www.bungie.net/Platform/Destiny2/Manifest/";

        return webClient.get()
                .uri(manifestUrl)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
