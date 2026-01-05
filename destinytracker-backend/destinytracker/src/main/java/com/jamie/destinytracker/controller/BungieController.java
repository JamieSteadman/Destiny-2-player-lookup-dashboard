package com.jamie.destinytracker.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jamie.destinytracker.service.BungieApiService;

@RestController
@RequestMapping("/api/bungie")
@CrossOrigin(origins = "http://localhost:5173")  // Allow CORS from frontend dev server
public class BungieController {
    private final BungieApiService bungieApiService;

    public BungieController(BungieApiService bungieApiService) {
        this.bungieApiService = bungieApiService;
    }

    @GetMapping("/search")
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
