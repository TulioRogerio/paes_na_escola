import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Agendamento from './pages/Agendamento'
import Agendadas from './pages/Agendadas'
import FormularioVisita from './pages/FormularioVisita'
import UploadATA from './pages/UploadATA'
import Consultas from './pages/Consultas'
import ConfigQuestoes from './pages/ConfigQuestoes'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/agendadas" element={<Agendadas />} />
        <Route path="/visita" element={<FormularioVisita />} />
        <Route path="/visita/:id" element={<FormularioVisita />} />
        <Route path="/upload-ata" element={<UploadATA />} />
        <Route path="/upload-ata/:id" element={<UploadATA />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/config-questoes" element={<ConfigQuestoes />} />
      </Routes>
    </Layout>
  )
}

export default App

