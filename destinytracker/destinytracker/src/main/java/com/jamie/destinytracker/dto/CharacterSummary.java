package com.jamie.destinytracker.dto;

// Holds key information from getProfile about a single Destiny 2 character
public record CharacterSummary(
        String characterId,
        int classType,
        int light,
        String emblemPath,
        String emblemBackgroundPath,
        String lastPlayed
)
{}
