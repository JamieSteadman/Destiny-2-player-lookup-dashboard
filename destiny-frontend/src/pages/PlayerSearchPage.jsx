import { useState } from "react"
import { searchPlayer } from "../services/bungieApi"

function PlayerSearchPage() {
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [player, setPlayer] = useState(null)

    async function handleSearch() {
        const data = await searchPlayer(name,code)
        setPlayer(data)
    }
    
    return (
        <div>
            <h2>Search Player</h2>

            <input
                placeholder="Bungie Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Four-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {player && <pre>{JSON.stringify(player, null, 2)}</pre>}
        </div>
    )
}

export default PlayerSearchPage