import { useState } from 'react'
import './Relatorios.css'

const Relatorios = () => {
  const [tipoRelatorio, setTipoRelatorio] = useState('geral')
  const [periodo, setPeriodo] = useState('mes')

  const tiposRelatorio = [
    { value: 'geral', label: 'Relatório Geral', icon: '📊' },
    { value: 'status', label: 'Por Status', icon: '📈' },
    { value: 'responsavel', label: 'Por Responsável', icon: '👤' },
    { value: 'categoria', label: 'Por Categoria', icon: '📁' },
  ]

  return (
    <div className="relatorios">
      <div className="page-header">
        <h2>Relatórios</h2>
        <p>Gere e visualize relatórios do sistema de monitoramento</p>
      </div>

      <div className="relatorios-content">
        <div className="filtros-panel">
          <div className="card">
            <h3>Configurar Relatório</h3>
            <div className="filtros-form">
              <div className="form-group">
                <label htmlFor="tipoRelatorio">Tipo de Relatório</label>
                <select
                  id="tipoRelatorio"
                  value={tipoRelatorio}
                  onChange={(e) => setTipoRelatorio(e.target.value)}
                >
                  {tiposRelatorio.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="periodo">Período</label>
                <select
                  id="periodo"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                >
                  <option value="semana">Última Semana</option>
                  <option value="mes">Último Mês</option>
                  <option value="trimestre">Último Trimestre</option>
                  <option value="ano">Último Ano</option>
                  <option value="personalizado">Personalizado</option>
                </select>
              </div>

              <div className="form-actions">
                <button className="btn btn-primary">Gerar Relatório</button>
                <button className="btn btn-secondary">Exportar PDF</button>
                <button className="btn btn-secondary">Exportar Excel</button>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Tipos de Relatório</h3>
            <div className="tipos-list">
              {tiposRelatorio.map((tipo) => (
                <div
                  key={tipo.value}
                  className={`tipo-item ${
                    tipoRelatorio === tipo.value ? 'active' : ''
                  }`}
                  onClick={() => setTipoRelatorio(tipo.value)}
                >
                  <span className="tipo-icon">{tipo.icon}</span>
                  <span className="tipo-label">{tipo.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="preview-panel">
          <div className="card">
            <div className="card-header">
              <h3>Pré-visualização</h3>
            </div>
            <div className="preview-content">
              <div className="preview-placeholder">
                <div className="preview-icon">📊</div>
                <p>Selecione as opções e clique em "Gerar Relatório"</p>
                <p className="preview-hint">
                  O relatório será exibido aqui após a geração
                </p>
              </div>

              <div className="preview-stats">
                <div className="stat-item">
                  <span className="stat-label">Total de Registros</span>
                  <span className="stat-value">156</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Concluídos</span>
                  <span className="stat-value">98</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Em Andamento</span>
                  <span className="stat-value">42</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Pendentes</span>
                  <span className="stat-value">16</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Relatorios

