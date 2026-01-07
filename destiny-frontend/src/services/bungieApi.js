const BASE_URL = "http://localhost:8080/api/bungie"

// Search for a player by name and code, returns player data in JSON format
export async function searchPlayer(name, code) {
    const result = await fetch(`${BASE_URL}/search?name=${name}&code=${code}`)
    return result.json()
}

// Get profile details for a player by membershipType and membershipId
export async function getPlayerProfile(membershipType, membershipId) {
    const result = await fetch(`${BASE_URL}/profile?membershipType=${membershipType}&membershipId=${membershipId}`)
    return result.json()
}

// Get character details for a specific character based on characterId
export async function getCharacterDetails(membershipType, membershipId, characterId) {
    const result = await fetch(`${BASE_URL}/character?membershipType=${membershipType}&membershipId=${membershipId}&characterId=${characterId}`)
    return result.json()
}