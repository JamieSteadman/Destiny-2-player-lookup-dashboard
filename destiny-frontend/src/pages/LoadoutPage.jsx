import { useLocation } from "react-router-dom"
import { useState } from "react"

function LoadoutPage() {
    const location = useLocation()
    const characterData = location.state?.characterData

    return (
        <div style={{
            backgroundColor: "#1c1a2e",
            color: "white",
            minHeight: "100vh",
            flexDirection: "column",
            padding: "20px",
            alignItems: "center",
            justifyContent: "flex-start"
        }}>
            <pre style={{ color: "white" }}>
                {JSON.stringify(characterData.Response, null, 2)}
            </pre>
        </div>
    )
}

export default LoadoutPage