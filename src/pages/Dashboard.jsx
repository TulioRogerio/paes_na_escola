import { useState, useMemo, useCallback } from 'react'
import './Dashboard.css'

const TRIMESTRES = ['1º Trimestre', '2º Trimestre', '3º Trimestre']

const DADOS_VISITAS = {
  '1º Trimestre': {
    previstas: 180,
    agendadas: 24,
    concluidas: 156,
  },
  '2º Trimestre': {
    previstas: 180,
    agendadas: 45,
    concluidas: 135,
  },
  '3º Trimestre': {
    previstas: 180,
    agendadas: 67,
    concluidas: 113,
  },
}

const GRUPOS_CARDS = [
  { id: 'prioritarias', nome: 'Escolas Prioritárias' },
  { id: 'pec', nome: 'PEC' },
  { id: 'material', nome: 'MATERIAL DIDÁTICO COMPLEMENTAR' },
  { id: 'formacao', nome: 'FORMAÇÃO' },
  { id: 'rotinas', nome: 'ROTINAS PEDAGÓGICAS' },
  { id: 'gestao', nome: 'GESTÃO, DADOS E ESTRATÉGIAS' },
  { id: 'premio', nome: 'PRÊMIO ESCOLA QUE COLABORA' },
]

const Dashboard = () => {
  const [trimestreSelecionado, setTrimestreSelecionado] = useState('1º Trimestre')

  const dadosAtuais = useMemo(
    () => DADOS_VISITAS[trimestreSelecionado] || DADOS_VISITAS['1º Trimestre'],
    [trimestreSelecionado]
  )

  const handleTrimestreChange = useCallback((e) => {
    setTrimestreSelecionado(e.target.value)
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>

      {/* Grupo 1: Acompanhamento das Visitas Técnicas */}
      <div className="dashboard-group">
        <div className="visitas-card-container">
          <div className="visitas-card">
            <div className="visitas-card-header">
              <h4>Visitas Técnicas</h4>
              <div className="trimestre-selector">
                <label htmlFor="trimestre-select">Trimestre:</label>
                <select
                  id="trimestre-select"
                  value={trimestreSelecionado}
                  onChange={handleTrimestreChange}
                  className="trimestre-select"
                >
                  {TRIMESTRES.map((trim) => (
                    <option key={trim} value={trim}>
                      {trim}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="visitas-metrics">
              <div className="visita-metric">
                <div className="metric-icon">📋</div>
                <div className="metric-content">
                  <span className="metric-label">Visitas Previstas</span>
                  <span className="metric-value">{dadosAtuais.previstas}</span>
                </div>
              </div>
              
              <div className="visita-metric">
                <div className="metric-icon">📅</div>
                <div className="metric-content">
                  <span className="metric-label">Visitas Agendadas</span>
                  <span className="metric-value metric-blue">{dadosAtuais.agendadas}</span>
                </div>
              </div>
              
              <div className="visita-metric">
                <div className="metric-icon">✅</div>
                <div className="metric-content">
                  <span className="metric-label">Visitas Concluídas</span>
                  <span className="metric-value metric-green">{dadosAtuais.concluidas}</span>
                </div>
              </div>
            </div>

            <div className="chart-container">
              <div className="chart-placeholder">
                <p>📊 Gráfico</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grupos-cards-grid">
          {GRUPOS_CARDS.map((grupo) => (
            <div key={grupo.id} className="visitas-card">
              <div className="visitas-card-header">
                <h4>{grupo.nome}</h4>
              </div>
              <div className="chart-container">
                <div className="chart-placeholder">
                  <p>📊 Gráfico</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

