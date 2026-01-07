import { useLocation } from "react-router-dom"

function LoadoutPage() {
    const location = useLocation()
    const characterData = location.state?.characterData

    return (
        <div style={{
            backgroundColor: "#1c1a2e",
            color: "white",
            minHeight: "100vh",
            padding: "20px"
        }}>
            
        </div>
    )
}

export default LoadoutPage