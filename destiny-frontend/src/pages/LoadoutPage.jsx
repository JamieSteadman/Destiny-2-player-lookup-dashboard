import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { getIconUrl } from "../services/bungieApi"

function LoadoutPage() {
    const location = useLocation()
    const characterData = location.state?.characterData
    const[itemElements, setItemElements] = useState([])

    // Call fetchEquieppedItems when component mounts
    useEffect(() => {
        fetchEquippedItems()
    }, [characterData])

    
    // Helper function to fetch equipped items
    async function fetchEquippedItems() {
        const itemData = characterData.Response.equipment.data.items
        const elements = []

        for (let i = 0; i < 8; i++) {
            const itemHash = itemData[i].itemHash
            const imageUrl = await getIconUrl(itemHash)
            const fullImageUrl = `https://www.bungie.net${imageUrl}`
            console.log(fullImageUrl)
            
            elements.push(
                <div 
                    key={itemHash}
                    style={{ marginBottom: "20px", position: "relative" }}
                >
                    <img
                        src={fullImageUrl}
                        style={{ width: "100px", height: "100px" }}
                    />
                </div>
            )
        }
        setItemElements(elements)
    }

    return (
        <div style={{
            backgroundColor: "#1c1a2e",
            color: "white",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            alignItems: "center",
            justifyContent: "flex-start"
        }}>
            <pre style={{ color: "white" }}>
                <div style={{ display: "flex" }}>
                    {itemElements}
                </div>
                {JSON.stringify(characterData.Response, null, 2)}
            </pre>
        </div>
    )
}

export default LoadoutPage