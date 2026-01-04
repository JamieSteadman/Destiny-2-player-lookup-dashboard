package com.jamie.destinytracker.dto;

public record BungieNameSearchRequest(
        String displayName,
        int displayNameCode
) {}
