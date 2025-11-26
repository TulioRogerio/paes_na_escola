import { useState, useRef, useEffect } from 'react'
import './Consultas.css'

// Componente de Dropdown Recolhível com Seleção Múltipla
const MultiSelectDropdown = ({
  label,
  options,
  selected,
  onChange,
  disabledOptions = [],
  placeholder = 'Selecione...',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const getDisplayText = () => {
    if (selected.length === 0) return placeholder
    if (selected.length === 1) return selected[0]
    if (selected.length === options.filter((opt) => !opt.disabled).length) return 'Todos selecionados'
    return `${selected.length} selecionado(s)`
  }

  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <label className="dropdown-label">{label}</label>
      <div
        className={`dropdown-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown-text">{getDisplayText()}</span>
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => {
            const isDisabled = option.disabled || disabledOptions.includes(option.value)
            const isSelected = selected.includes(option.value)
            return (
              <div
                key={option.value}
                className={`dropdown-option ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => !isDisabled && toggleOption(option.value)}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  disabled={isDisabled}
                />
                <span>{option.label}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const Consultas = () => {
  const [filtrosAbertos, setFiltrosAbertos] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)
  const [visitaSelecionada, setVisitaSelecionada] = useState(null)
  const [filtros, setFiltros] = useState({
    sre: '',
    municipio: '',
    escola: '',
    trimestre: '',
    status: '',
  })
  const [filtrosExport, setFiltrosExport] = useState({
    regionais: [],
    municipios: [],
    escolas: [],
    trimestres: [],
    secoes: [
      'Escolas Prioritárias',
      'PEC',
      'Material Didático Complementar',
      'Formação',
      'Rotinas Pedagógicas',
      'Gestão, Dados e Estratégias',
      'Prêmio Escola que Colabora',
    ],
  })
  const sres = ['SRE Vitória', 'SRE Cachoeiro', 'SRE Colatina', 'SRE Linhares', 'SRE Afonso Cláudio']
  const municipios = {
    'SRE Vitória': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica'],
    'SRE Cachoeiro': ['Cachoeiro de Itapemirim', 'Castelo', 'Itapemirim'],
    'SRE Afonso Cláudio': ['Brejetuba', 'Afonso Cláudio', 'Laranja da Terra'],
  }
  const escolas = {
    Vitória: ['EEEF João Silva', 'EEEF Maria Santos', 'EEEF Pedro Costa'],
    'Vila Velha': ['EEEF Vila Velha 1', 'EEEF Vila Velha 2'],
    Brejetuba: ['EEEF Brejetuba Central', 'EEEF Brejetuba Sul'],
  }

  const visitas = [
    {
      id: 1,
      sre: 'SRE Vitória',
      municipio: 'Vitória',
      escola: 'EEEF João Silva',
      trimestre: '1º Trimestre',
      data: '2024-04-15',
      status: 'concluida',
      escolaPrioritaria: 'Sim',
    },
    {
      id: 2,
      sre: 'SRE Vitória',
      municipio: 'Vila Velha',
      escola: 'EEEF Vila Velha 1',
      trimestre: '1º Trimestre',
      data: '2024-04-20',
      status: 'em_andamento',
      escolaPrioritaria: 'Não',
    },
  ]

  const handleFilterChange = (name, value) => {
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
      // Limpar filtros dependentes
      ...(name === 'sre' && { municipio: '', escola: '' }),
      ...(name === 'municipio' && { escola: '' }),
    }))
  }

  const handleRemoveTag = (name) => {
    setFiltros((prev) => ({
      ...prev,
      [name]: '',
      // Limpar filtros dependentes
      ...(name === 'sre' && { municipio: '', escola: '' }),
      ...(name === 'municipio' && { escola: '' }),
    }))
  }

  const handleLimparTodos = () => {
    setFiltros({
      sre: '',
      municipio: '',
      escola: '',
      trimestre: '',
      status: '',
    })
  }

  const visitasFiltradas = visitas.filter((visita) => {
    return (
      (!filtros.sre || visita.sre === filtros.sre) &&
      (!filtros.municipio || visita.municipio === filtros.municipio) &&
      (!filtros.escola || visita.escola === filtros.escola) &&
      (!filtros.trimestre || visita.trimestre === filtros.trimestre) &&
      (!filtros.status || visita.status === filtros.status)
    )
  })

  const temFiltrosAtivos = Object.values(filtros).some((valor) => valor !== '')

  // Função para exportar dados para CSV
  const handleExportarCSV = () => {
    // Dados mockados para demonstração
    const dadosMockados = [
      {
        escola: 'EEEF João Silva',
        sre: 'SRE Vitória',
        municipio: 'Vitória',
        trimestre: '1º Trimestre',
        data: '15/04/2024',
        escolaPrioritaria: 'Sim',
        status: 'Concluída',
        pec: 'Implementado',
        materialDidatico: 'Utilizando',
        formacao: 'Participando',
        rotinas: 'Definidas',
        gestao: 'Utilizando dados',
        premio: 'Participando',
      },
      {
        escola: 'EEEF Maria Santos',
        sre: 'SRE Vitória',
        municipio: 'Vitória',
        trimestre: '1º Trimestre',
        data: '20/04/2024',
        escolaPrioritaria: 'Não',
        status: 'Em Andamento',
        pec: 'Parcialmente implementado',
        materialDidatico: 'Utilizando',
        formacao: 'Não participando',
        rotinas: 'Definidas',
        gestao: 'Utilizando dados',
        premio: 'Não participando',
      },
      {
        escola: 'EEEF Vila Velha 1',
        sre: 'SRE Vitória',
        municipio: 'Vila Velha',
        trimestre: '1º Trimestre',
        data: '25/04/2024',
        escolaPrioritaria: 'Sim',
        status: 'Concluída',
        pec: 'Implementado',
        materialDidatico: 'Utilizando',
        formacao: 'Participando',
        rotinas: 'Definidas',
        gestao: 'Utilizando dados',
        premio: 'Participando',
      },
      {
        escola: 'EEEF Pedro Costa',
        sre: 'SRE Vitória',
        municipio: 'Vitória',
        trimestre: '2º Trimestre',
        data: '10/05/2024',
        escolaPrioritaria: 'Não',
        status: 'Concluída',
        pec: 'Implementado',
        materialDidatico: 'Utilizando',
        formacao: 'Participando',
        rotinas: 'Definidas',
        gestao: 'Utilizando dados',
        premio: 'Participando',
      },
      {
        escola: 'EEEF Cachoeiro Central',
        sre: 'SRE Cachoeiro',
        municipio: 'Cachoeiro de Itapemirim',
        trimestre: '1º Trimestre',
        data: '18/04/2024',
        escolaPrioritaria: 'Sim',
        status: 'Concluída',
        pec: 'Implementado',
        materialDidatico: 'Utilizando',
        formacao: 'Participando',
        rotinas: 'Definidas',
        gestao: 'Utilizando dados',
        premio: 'Participando',
      },
    ]

    // Filtrar dados baseado nos filtros de exportação
    let dadosFiltrados = dadosMockados

    if (filtrosExport.regionais.length > 0) {
      dadosFiltrados = dadosFiltrados.filter((d) =>
        filtrosExport.regionais.includes(d.sre)
      )
    }

    if (filtrosExport.municipios.length > 0) {
      dadosFiltrados = dadosFiltrados.filter((d) =>
        filtrosExport.municipios.includes(d.municipio)
      )
    }

    if (filtrosExport.escolas.length > 0) {
      dadosFiltrados = dadosFiltrados.filter((d) =>
        filtrosExport.escolas.includes(d.escola)
      )
    }

    if (filtrosExport.trimestres.length > 0) {
      dadosFiltrados = dadosFiltrados.filter((d) =>
        filtrosExport.trimestres.includes(d.trimestre)
      )
    }

    // Definir cabeçalhos baseado nas seções selecionadas
    const cabecalhos = ['Escola', 'SRE', 'Município', 'Trimestre', 'Data', 'Prioritária', 'Status']

    // Adicionar seções selecionadas aos cabeçalhos
    if (filtrosExport.secoes.includes('PEC')) {
      cabecalhos.push('PEC')
    }
    if (filtrosExport.secoes.includes('Material Didático Complementar')) {
      cabecalhos.push('Material Didático')
    }
    if (filtrosExport.secoes.includes('Formação')) {
      cabecalhos.push('Formação')
    }
    if (filtrosExport.secoes.includes('Rotinas Pedagógicas')) {
      cabecalhos.push('Rotinas Pedagógicas')
    }
    if (filtrosExport.secoes.includes('Gestão, Dados e Estratégias')) {
      cabecalhos.push('Gestão e Dados')
    }
    if (filtrosExport.secoes.includes('Prêmio Escola que Colabora')) {
      cabecalhos.push('Prêmio Escola')
    }

    // Criar linhas CSV
    const linhas = [cabecalhos.join(';')]

    dadosFiltrados.forEach((dado) => {
      const linha = [
        dado.escola,
        dado.sre,
        dado.municipio,
        dado.trimestre,
        dado.data,
        dado.escolaPrioritaria,
        dado.status,
      ]

      // Adicionar seções selecionadas
      if (filtrosExport.secoes.includes('PEC')) {
        linha.push(dado.pec)
      }
      if (filtrosExport.secoes.includes('Material Didático Complementar')) {
        linha.push(dado.materialDidatico)
      }
      if (filtrosExport.secoes.includes('Formação')) {
        linha.push(dado.formacao)
      }
      if (filtrosExport.secoes.includes('Rotinas Pedagógicas')) {
        linha.push(dado.rotinas)
      }
      if (filtrosExport.secoes.includes('Gestão, Dados e Estratégias')) {
        linha.push(dado.gestao)
      }
      if (filtrosExport.secoes.includes('Prêmio Escola que Colabora')) {
        linha.push(dado.premio)
      }

      linhas.push(linha.join(';'))
    })

    // Criar conteúdo CSV
    const conteudoCSV = linhas.join('\n')

    // Adicionar BOM para UTF-8 (necessário para Excel reconhecer acentos)
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + conteudoCSV], {
      type: 'text/csv;charset=utf-8;',
    })

    // Criar link de download
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `visitas_tecnicas_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    alert(`Arquivo CSV exportado com sucesso! ${dadosFiltrados.length} registro(s) exportado(s).`)
  }

  const getStatusClass = (status) => {
    const statusMap = {
      concluida: 'status-success',
      em_andamento: 'status-warning',
      agendada: 'status-info',
      cancelada: 'status-danger',
    }
    return statusMap[status] || 'status-info'
  }

  const getStatusLabel = (status) => {
    const labelMap = {
      concluida: 'Concluída',
      em_andamento: 'Em Andamento',
      agendada: 'Agendada',
      cancelada: 'Cancelada',
    }
    return labelMap[status] || status
  }

  const municipiosDisponiveis = filtros.sre ? municipios[filtros.sre] || [] : []
  const escolasDisponiveis = filtros.municipio ? escolas[filtros.municipio] || [] : []

  return (
    <div className="consultas">
      <div className="page-header">
        <h2>Consultas</h2>
        <p>Consulte visitas técnicas por Regional, Município ou Escola</p>
      </div>

      <div className="filtros-container">
        <div className={`filtros-card ${filtrosAbertos ? 'aberto' : 'fechado'}`}>
          <div className="filtros-header">
            <h3>Filtros</h3>
            <button
              type="button"
              className="toggle-filtros"
              onClick={() => setFiltrosAbertos(!filtrosAbertos)}
            >
              {filtrosAbertos ? 'Ocultar filtro' : 'Mostrar filtro'}
              <span className={`chevron ${filtrosAbertos ? 'aberto' : ''}`}>▲</span>
            </button>
          </div>

          {filtrosAbertos && (
            <div className="filtros-content">
              <div className="filtros-grid">
                <div className="filtro-field">
                  <label htmlFor="sre">Selecionar regional</label>
                  <div className="select-wrapper">
                    <div className="select-tags">
                      {filtros.sre && (
                        <span className="select-tag">
                          {filtros.sre}
                          <button
                            type="button"
                            className="tag-remove"
                            onClick={() => handleRemoveTag('sre')}
                          >
                            ✕
                          </button>
                        </span>
                      )}
                      <select
                        id="sre"
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleFilterChange('sre', e.target.value)
                            e.target.value = ''
                          }
                        }}
                        className="filtro-select"
                      >
                        <option value="">Selecione regional</option>
                        {sres
                          .filter((sre) => sre !== filtros.sre)
                          .map((sre) => (
                            <option key={sre} value={sre}>
                              {sre}
                            </option>
                          ))}
                      </select>
                    </div>
                    {filtros.sre && (
                      <button
                        type="button"
                        className="clear-select"
                        onClick={() => handleRemoveTag('sre')}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="filtro-field">
                  <label htmlFor="municipio">Selecionar município</label>
                  <div className="select-wrapper">
                    <div className="select-tags">
                      {filtros.municipio && (
                        <span className="select-tag">
                          {filtros.municipio}
                          <button
                            type="button"
                            className="tag-remove"
                            onClick={() => handleRemoveTag('municipio')}
                          >
                            ✕
                          </button>
                        </span>
                      )}
                      <select
                        id="municipio"
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleFilterChange('municipio', e.target.value)
                            e.target.value = ''
                          }
                        }}
                        className="filtro-select"
                        disabled={!filtros.sre}
                      >
                        <option value="">Selecione município</option>
                        {municipiosDisponiveis
                          .filter((mun) => mun !== filtros.municipio)
                          .map((mun) => (
                            <option key={mun} value={mun}>
                              {mun}
                            </option>
                          ))}
                      </select>
                    </div>
                    {filtros.municipio && (
                      <button
                        type="button"
                        className="clear-select"
                        onClick={() => handleRemoveTag('municipio')}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="filtro-field">
                  <label htmlFor="escola">Selecionar escola</label>
                  <div className="select-wrapper">
                    <div className="select-tags">
                      {filtros.escola && (
                        <span className="select-tag">
                          {filtros.escola}
                          <button
                            type="button"
                            className="tag-remove"
                            onClick={() => handleRemoveTag('escola')}
                          >
                            ✕
                          </button>
                        </span>
                      )}
                      <select
                        id="escola"
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleFilterChange('escola', e.target.value)
                            e.target.value = ''
                          }
                        }}
                        className="filtro-select"
                        disabled={!filtros.municipio}
                      >
                        <option value="">Selecione escola</option>
                        {escolasDisponiveis
                          .filter((esc) => esc !== filtros.escola)
                          .map((esc) => (
                            <option key={esc} value={esc}>
                              {esc}
                            </option>
                          ))}
                      </select>
                    </div>
                    {filtros.escola && (
                      <button
                        type="button"
                        className="clear-select"
                        onClick={() => handleRemoveTag('escola')}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="filtros-actions">
                <button
                  type="button"
                  className="btn btn-clear"
                  onClick={handleLimparTodos}
                >
                  <span>🔄</span>
                  Limpar
                </button>
                <button type="button" className="btn btn-filter">
                  <span>🔍</span>
                  Filtrar
                </button>
              </div>
            </div>
          )}
        </div>

        {temFiltrosAtivos && (
          <div className="breadcrumb-bar">
            <span className="breadcrumb-item">Espírito Santo</span>
            {filtros.sre && (
              <>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-item">{filtros.sre}</span>
              </>
            )}
            {filtros.municipio && (
              <>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-item">{filtros.municipio}</span>
              </>
            )}
            {filtros.escola && (
              <>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-item">{filtros.escola}</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="consultas-content">

        <div className="resultados-panel">
          <div className="card">
            <div className="resultados-header">
              <h3>Resultados</h3>
              <span className="resultados-count">
                {visitasFiltradas.length} visita(s) encontrada(s)
              </span>
            </div>

            <div className="visitas-table">
              {visitasFiltradas.length === 0 ? (
                <p className="empty-state">Nenhuma visita encontrada</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Escola</th>
                      <th>SRE</th>
                      <th>Município</th>
                      <th>Trimestre</th>
                      <th>Data</th>
                      <th>Prioritária</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitasFiltradas.map((visita) => (
                      <tr key={visita.id}>
                        <td className="escola-cell">{visita.escola}</td>
                        <td>{visita.sre}</td>
                        <td>{visita.municipio}</td>
                        <td>{visita.trimestre}</td>
                        <td>
                          {new Date(visita.data).toLocaleDateString('pt-BR')}
                        </td>
                        <td>{visita.escolaPrioritaria}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(visita.status)}`}>
                            {getStatusLabel(visita.status)}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-link"
                            onClick={() => {
                              setVisitaSelecionada(visita)
                              setModalAberto(true)
                            }}
                          >
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="export-panel">
          <div className="card">
            <div className="export-header">
              <h3>Exportar Dados</h3>
            </div>
            <div className="export-content">
              <div className="export-filters">
                <div className="export-filter-group">
                  <label className="export-filter-label" htmlFor="export-regionais">
                    Escolher Regionais/Municípios/Escolas:
                  </label>
                  <div className="export-dropdowns">
                    <MultiSelectDropdown
                      label="Regionais (SRE):"
                      options={sres.map((sre) => ({ value: sre, label: sre }))}
                      selected={filtrosExport.regionais}
                      onChange={(selected) => {
                        setFiltrosExport((prev) => {
                          const newMunicipios = prev.municipios.filter((m) => {
                            const sreDoMunicipio = Object.keys(municipios).find((sre) =>
                              municipios[sre].includes(m)
                            )
                            return selected.includes(sreDoMunicipio)
                          })
                          const newEscolas = prev.escolas.filter((e) => {
                            const municipioDaEscola = Object.keys(escolas).find((mun) =>
                              escolas[mun].includes(e)
                            )
                            const sreDoMunicipio = Object.keys(municipios).find((sre) =>
                              municipios[sre].includes(municipioDaEscola)
                            )
                            return selected.includes(sreDoMunicipio)
                          })
                          return {
                            ...prev,
                            regionais: selected,
                            municipios: newMunicipios,
                            escolas: newEscolas,
                          }
                        })
                      }}
                      placeholder="Selecione as Regionais"
                    />

                    <MultiSelectDropdown
                      label="Municípios:"
                      options={Object.values(municipios)
                        .flat()
                        .filter((mun, index, self) => self.indexOf(mun) === index)
                        .map((mun) => {
                          const sreDoMunicipio = Object.keys(municipios).find((sre) =>
                            municipios[sre].includes(mun)
                          )
                          const isEnabled = filtrosExport.regionais.includes(sreDoMunicipio)
                          return { value: mun, label: mun, disabled: !isEnabled }
                        })}
                      selected={filtrosExport.municipios}
                      onChange={(selected) => {
                        setFiltrosExport((prev) => {
                          const newEscolas = prev.escolas.filter((e) => {
                            const municipioDaEscola = Object.keys(escolas).find((mun) =>
                              escolas[mun].includes(e)
                            )
                            return selected.includes(municipioDaEscola)
                          })
                          return {
                            ...prev,
                            municipios: selected,
                            escolas: newEscolas,
                          }
                        })
                      }}
                      disabledOptions={Object.values(municipios)
                        .flat()
                        .filter((mun, index, self) => self.indexOf(mun) === index)
                        .filter((mun) => {
                          const sreDoMunicipio = Object.keys(municipios).find((sre) =>
                            municipios[sre].includes(mun)
                          )
                          return !filtrosExport.regionais.includes(sreDoMunicipio)
                        })}
                      placeholder="Selecione os Municípios"
                    />

                    <MultiSelectDropdown
                      label="Escolas:"
                      options={Object.values(escolas)
                        .flat()
                        .map((esc) => {
                          const municipioDaEscola = Object.keys(escolas).find((mun) =>
                            escolas[mun].includes(esc)
                          )
                          const sreDoMunicipio = Object.keys(municipios).find((sre) =>
                            municipios[sre].includes(municipioDaEscola)
                          )
                          const isEnabled =
                            filtrosExport.regionais.includes(sreDoMunicipio) ||
                            filtrosExport.municipios.includes(municipioDaEscola)
                          return { value: esc, label: esc, disabled: !isEnabled }
                        })}
                      selected={filtrosExport.escolas}
                      onChange={(selected) => {
                        setFiltrosExport((prev) => ({
                          ...prev,
                          escolas: selected,
                        }))
                      }}
                      disabledOptions={Object.values(escolas)
                        .flat()
                        .filter((esc) => {
                          const municipioDaEscola = Object.keys(escolas).find((mun) =>
                            escolas[mun].includes(esc)
                          )
                          const sreDoMunicipio = Object.keys(municipios).find((sre) =>
                            municipios[sre].includes(municipioDaEscola)
                          )
                          return (
                            !filtrosExport.regionais.includes(sreDoMunicipio) &&
                            !filtrosExport.municipios.includes(municipioDaEscola)
                          )
                        })}
                      placeholder="Selecione as Escolas"
                    />
                  </div>
                </div>

                <div className="export-filter-group">
                  <MultiSelectDropdown
                    label="Escolher Trimestres:"
                    options={['1º Trimestre', '2º Trimestre', '3º Trimestre', 'Total'].map((trim) => ({
                      value: trim,
                      label: trim,
                    }))}
                    selected={filtrosExport.trimestres}
                    onChange={(selected) => {
                      setFiltrosExport((prev) => ({
                        ...prev,
                        trimestres: selected,
                      }))
                    }}
                    placeholder="Selecione os Trimestres"
                  />
                </div>

                <div className="export-filter-group">
                  <MultiSelectDropdown
                    label="Escolher quais seções aparecerão:"
                    options={[
                      'Escolas Prioritárias',
                      'PEC',
                      'Material Didático Complementar',
                      'Formação',
                      'Rotinas Pedagógicas',
                      'Gestão, Dados e Estratégias',
                      'Prêmio Escola que Colabora',
                    ].map((secao) => ({
                      value: secao,
                      label: secao,
                    }))}
                    selected={filtrosExport.secoes}
                    onChange={(selected) => {
                      setFiltrosExport((prev) => ({
                        ...prev,
                        secoes: selected,
                      }))
                    }}
                    placeholder="Selecione as Seções"
                  />
                </div>
              </div>

              <div className="export-actions">
                <button
                  type="button"
                  className="btn btn-export"
                  onClick={handleExportarCSV}
                >
                  <span>📊</span>
                  Exportar para Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {modalAberto && (
        <div
          className="modal-overlay"
          onClick={() => setModalAberto(false)}
        >
          <div
            className="modal-content modal-large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Detalhes da Visita Técnica</h3>
              <button
                className="modal-close"
                onClick={() => setModalAberto(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="construcao-placeholder">
                <div className="construcao-icon">🚧</div>
                <h4>Página em Construção</h4>
                <p>Os detalhes da visita técnica serão exibidos aqui em breve.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Consultas

