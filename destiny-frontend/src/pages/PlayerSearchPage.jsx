import { useState } from "react"
import { searchPlayer } from "../services/bungieApi"
import { getPlayerProfile } from "../services/bungieApi"

function PlayerSearchPage() {
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [player, setPlayer] = useState(null)
    const [profile, setProfile] = useState(null)

    async function handleSearch() {
        const data = await searchPlayer(name, code)
        setPlayer(data)

        if (data.Response && data.Response.length > 0) {
            const firstAccount = data.Response[0]
            const profileData = await getPlayerProfile(firstAccount.membershipType, firstAccount.membershipId)
            setProfile(profileData)
        }
    }

    // Helper function to render character emblems
    function renderCharacterEmblems() {
        if (!profile || !profile.Response || !profile.Response.characters) {
            return null
        }

        const characters = profile.Response.characters.data
        const characterIds = Object.keys(characters)

        let characterElements = []
        // Fills array with JSX elements for each character emblem
        for (let i = 0; i < characterIds.length; i++) {
            const characterId = characterIds[i]
            const character = characters[characterId]
            const emblemBackgroundUrl = `https://www.bungie.net${character.emblemBackgroundPath}`
            const className = character.classType === 0 ? "Titan" : character.classType === 1 ? "Hunter" : "Warlock"
            const raceName = character.raceType === 0 ? "Human" : character.raceType === 1 ? "Awoken" : "Exo"
            characterElements.push(
                <div key={characterId} style={{ marginBottom: "20px", position: "relative" }}>
                    <img 
                        src={emblemBackgroundUrl}
                        style={{ height: "100px", display: "block" }}
                    />    
                    
                    {/* Class name in top left of the emblem */}
                    <span style={{
                        position: "absolute",
                        top: "5px",
                        left: "100px",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "22px",
                        padding: "2px 4px",
                        borderRadius: "3px",
                    }}>
                        {className}
                    </span>

                    {/* Race name under class, in middle left */}
                    <span style={{
                        position: "absolute",
                        top: "30px",
                        left: "100px",
                        color: "grey",
                        fontWeight: "bold",
                        fontSize: "15px",
                        padding: "2px 4px",
                        borderRadius: "3px",
                    }}>
                        {raceName}
                    </span>

                    {/* Light level in top right of the emblem */}
                    <span style={{
                        position: "absolute",
                        top: "5px",
                        left: "430px",
                        color: "yellow",
                        fontWeight: "bold",
                        fontSize: "25px",
                        padding: "2px 4px",
                        borderRadius: "3px",
                    }}>
                        <sup>♦</sup>{character.light}
                    </span>  
                </div>
            )
        }

        return (
            <div>
                <h3>Character Emblems</h3>
                {characterElements}
            </div>
        )
        
    }
    
    return (
        <div style={{
            backgroundColor: "#1c1a2e",
            color: "white",
            minHeight: "100vh", 
            display: "flex",
            flexDirection: "column",  
            alignItems: "center",  // Centers horizontally
            justifyContent: "flex-start",
            paddingTop: "10vh"  // Positions search elements in upper middle
        }}>
            <h2>Search Player</h2>

            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <input
                    placeholder="Bungie Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        width: "200px",
                        height: "40px",
                        borderRadius: "20px", // Oval shape
                        border: "1px solid #646cff",
                        padding: "0 15px",
                        fontSize: "16px",
                        backgroundColor: "#1a1a1a",
                        color: "white",
                        outline: "none"
                    }}
                />
                <input
                    placeholder="Four-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    style={{
                        width: "120px",
                        height: "40px",
                        borderRadius: "20px", // Oval shape
                        border: "1px solid #646cff",
                        padding: "0 15px",
                        fontSize: "16px",
                        backgroundColor: "#1a1a1a",
                        color: "white",
                        outline: "none"
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",  // Circle shape
                        border: "1px solid #646cff",
                        backgroundColor: "#1a1a1a",
                        color: "white",
                        fontSize: "18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    🔍
                </button>
            </div>
            {renderCharacterEmblems()}

            {profile && <pre style={{ color: "white" }}>{JSON.stringify(profile, null, 2)}</pre>}
        </div>
    )
}

export default PlayerSearchPage