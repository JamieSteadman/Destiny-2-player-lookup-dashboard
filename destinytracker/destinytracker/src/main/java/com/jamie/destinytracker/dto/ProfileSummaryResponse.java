package com.jamie.destinytracker.dto;

import java.util.List;

// Holds key information about a single Destiny 2 profile and contains a list of CharacterSummary objects,
// one for each character attached to the profile.
public record ProfileSummaryResponse(
        String bungieName,
        int membershipType,
        String membershipId,
        List<CharacterSummary> characters
)
{}
