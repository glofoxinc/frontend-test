import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DetailPage } from './pages/DetailPage'
import { ListPage } from './pages/ListPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/pokemon/:name" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
