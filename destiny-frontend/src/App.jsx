import { Routes, Route } from "react-router-dom"
import PlayerSearchPage from "./pages/PlayerSearchPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlayerSearchPage />} />
    </Routes>
  )
}

export default App