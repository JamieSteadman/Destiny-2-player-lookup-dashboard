const BASE_URL = "http://localhost:8080/api/bungie"

// Search for a player by name and code, returns player data in JSON format
export async function searchPlayer(name, code) {
    const result = await fetch(`${BASE_URL}/search?name=${name}&code=${code}`)
    return result.json()
}