package com.jamie.destinytracker.controller;

import com.jamie.destinytracker.service.BungieApiService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/bungie")
public class BungieController {
    private final BungieApiService bungieApiService;

    public BungieController(BungieApiService bungieApiService) {
        this.bungieApiService = bungieApiService;
    }

    @PostMapping("/search")
    public String searchBungieName(@RequestParam String name, @RequestParam int code) {
        return bungieApiService.searchByBungieName(name, code);
    }

    @GetMapping("/profile")
    public String getProfile(@RequestParam int membershipType, @RequestParam String membershipId) {
        return bungieApiService.getProfile(membershipType, membershipId);
    }

    @GetMapping("/character")
    public Map<String, Object> getCharacter (
            @RequestParam int membershipType,
            @RequestParam String membershipId,
            @RequestParam String characterId
    ) {
        return bungieApiService.getCharacter(membershipType, membershipId, characterId);
    }
}
