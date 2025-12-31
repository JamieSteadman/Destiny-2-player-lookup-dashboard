package com.jamie.destinytracker.controller;

import com.jamie.destinytracker.service.BungieApiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bungie")
public class BungieController {
    private final BungieApiService bungieApiService;

    public BungieController(BungieApiService bungieApiService) {
        this.bungieApiService = bungieApiService;
    }

    @PostMapping("/search")
    public String findProfile(@RequestParam String name, @RequestParam int code) {
        return bungieApiService.searchByBungieName(name, code);
    }
}
