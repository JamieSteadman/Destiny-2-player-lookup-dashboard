import { Routes, Route } from "react-router-dom"
import PlayerSearchPage from "./pages/PlayerSearchPage"
import LoadoutPage from "./pages/LoadoutPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlayerSearchPage />} />
      <Route path="/loadout" element={<LoadoutPage />} />
    </Routes>
  )
}

export default App