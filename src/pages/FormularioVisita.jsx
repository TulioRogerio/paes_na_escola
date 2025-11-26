import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import './FormularioVisita.css'

const SRES = ['SRE Vitória', 'SRE Cachoeiro', 'SRE Colatina', 'SRE Linhares', 'SRE Afonso Cláudio']
const MUNICIPIOS = {
  'SRE Vitória': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica'],
  'SRE Cachoeiro': ['Cachoeiro de Itapemirim', 'Castelo', 'Itapemirim'],
  'SRE Colatina': ['Colatina', 'Baixo Guandu', 'São Gabriel da Palha'],
  'SRE Linhares': ['Linhares', 'São Mateus', 'Aracruz'],
  'SRE Afonso Cláudio': ['Brejetuba', 'Afonso Cláudio', 'Laranja da Terra'],
}
const ESCOLAS = {
  Vitória: ['EEEF João Silva', 'EEEF Maria Santos', 'EEEF Pedro Costa'],
  'Vila Velha': ['EEEF Vila Velha 1', 'EEEF Vila Velha 2'],
  Brejetuba: ['EEEF Brejetuba Central', 'EEEF Brejetuba Sul'],
}
const TRIMESTRES = ['1º Trimestre', '2º Trimestre', '3º Trimestre']

const FormularioVisita = () => {
  const { id } = useParams()
  const [filtrosAbertos, setFiltrosAbertos] = useState(true)
  const [filtros, setFiltros] = useState({
    sre: '',
    municipio: '',
    escola: '',
    trimestre: '',
  })
  const [escolaPrioritaria, setEscolaPrioritaria] = useState('')
  const [respostas, setRespostas] = useState({})
  const [abaAtiva, setAbaAtiva] = useState('geral')
  const [fotos, setFotos] = useState([])

  const gruposQuestoes = [
    {
      id: 'pec',
      nome: 'PEC',
      questoes: [
        { id: 'pec1', texto: 'A escola possui PEC implementado?', tipo: 'sim_nao' },
        { id: 'pec2', texto: 'Quantos professores participam do PEC?', tipo: 'texto_curto' },
        { id: 'pec3', texto: 'Qual a frequência das reuniões do PEC?', tipo: 'multipla_escolha', opcoes: ['Semanal', 'Quinzenal', 'Mensal', 'Não há reuniões'] },
      ],
    },
    {
      id: 'material',
      nome: 'MATERIAL DIDÁTICO COMPLEMENTAR',
      questoes: [
        { id: 'mat1', texto: 'A escola recebe material didático complementar?', tipo: 'sim_nao' },
        { id: 'mat2', texto: 'O material está sendo utilizado pelos professores?', tipo: 'sim_nao' },
        { id: 'mat3', texto: 'Descreva como o material está sendo utilizado:', tipo: 'texto_longo' },
      ],
    },
    {
      id: 'formacao',
      nome: 'FORMAÇÃO',
      questoes: [
        { id: 'for1', texto: 'Os professores participam de formações continuadas?', tipo: 'sim_nao' },
        { id: 'for2', texto: 'Quantas formações foram realizadas neste trimestre?', tipo: 'texto_curto' },
        { id: 'for3', texto: 'Quais áreas foram abordadas nas formações?', tipo: 'texto_longo' },
      ],
    },
    {
      id: 'rotinas',
      nome: 'ROTINAS PEDAGÓGICAS',
      questoes: [
        { id: 'rot1', texto: 'A escola possui rotinas pedagógicas definidas?', tipo: 'sim_nao' },
        { id: 'rot2', texto: 'As rotinas estão sendo seguidas?', tipo: 'sim_nao' },
        { id: 'rot3', texto: 'Descreva as principais rotinas pedagógicas:', tipo: 'texto_longo' },
      ],
    },
    {
      id: 'gestao',
      nome: 'GESTÃO, DADOS E ESTRATÉGIAS',
      questoes: [
        { id: 'ges1', texto: 'A gestão utiliza dados para tomada de decisão?', tipo: 'sim_nao' },
        { id: 'ges2', texto: 'Quais estratégias estão sendo implementadas?', tipo: 'texto_longo' },
        { id: 'ges3', texto: 'Como os dados são coletados e analisados?', tipo: 'texto_longo' },
      ],
    },
    {
      id: 'premio',
      nome: 'PRÊMIO ESCOLA QUE COLABORA',
      questoes: [
        { id: 'pre1', texto: 'A escola participa do prêmio?', tipo: 'sim_nao' },
        { id: 'pre2', texto: 'Quais ações foram desenvolvidas?', tipo: 'texto_longo' },
        { id: 'pre3', texto: 'Qual o resultado alcançado?', tipo: 'texto_curto' },
      ],
    },
  ]

  const municipiosDisponiveis = useMemo(
    () => (filtros.sre ? MUNICIPIOS[filtros.sre] || [] : []),
    [filtros.sre]
  )

  const escolasDisponiveis = useMemo(
    () => (filtros.municipio ? ESCOLAS[filtros.municipio] || [] : []),
    [filtros.municipio]
  )

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

  const handleRespostaChange = (questaoId, valor) => {
    setRespostas((prev) => ({
      ...prev,
      [questaoId]: valor,
    }))
  }

  const renderQuestao = (questao) => {
    switch (questao.tipo) {
      case 'sim_nao':
        return (
          <div className="questao-sim-nao">
            <label className="radio-option">
              <input
                type="radio"
                name={questao.id}
                value="sim"
                checked={respostas[questao.id] === 'sim'}
                onChange={(e) => handleRespostaChange(questao.id, e.target.value)}
              />
              <span>Sim</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name={questao.id}
                value="nao"
                checked={respostas[questao.id] === 'nao'}
                onChange={(e) => handleRespostaChange(questao.id, e.target.value)}
              />
              <span>Não</span>
            </label>
          </div>
        )

      case 'multipla_escolha':
        return (
          <select
            value={respostas[questao.id] || ''}
            onChange={(e) => handleRespostaChange(questao.id, e.target.value)}
            className="questao-select"
          >
            <option value="">Selecione uma opção</option>
            {questao.opcoes.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        )

      case 'texto_curto':
        return (
          <input
            type="text"
            value={respostas[questao.id] || ''}
            onChange={(e) => handleRespostaChange(questao.id, e.target.value)}
            className="questao-input"
            placeholder="Digite sua resposta"
          />
        )

      case 'texto_longo':
        return (
          <textarea
            value={respostas[questao.id] || ''}
            onChange={(e) => handleRespostaChange(questao.id, e.target.value)}
            className="questao-textarea"
            rows="4"
            placeholder="Digite sua resposta"
          />
        )

      default:
        return null
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dadosVisita = {
      escolaPrioritaria,
      respostas,
      fotos: fotos.map((foto) => ({
        nome: foto.nome,
        tamanho: foto.file.size,
        tipo: foto.file.type,
      })),
      dataPreenchimento: new Date().toISOString(),
    }
    console.log('Dados da visita:', dadosVisita)
    alert('Formulário de visita salvo com sucesso!')
  }

  return (
    <div className="formulario-visita">
      <div className="page-header">
        <h2>Formulário de Visita Técnica</h2>
        <p>Preencha todas as questões da visita técnica</p>
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
                  <label htmlFor="filtro-sre">Selecionar regional</label>
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
                        id="filtro-sre"
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
                        {SRES.filter((sre) => sre !== filtros.sre).map((sre) => (
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
                  <label htmlFor="filtro-municipio">Selecionar município</label>
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
                        id="filtro-municipio"
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
                  <label htmlFor="filtro-escola">Selecionar escola</label>
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
                        id="filtro-escola"
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

                <div className="filtro-field">
                  <label htmlFor="filtro-trimestre">Selecionar trimestre</label>
                  <div className="select-wrapper">
                    <div className="select-tags">
                      {filtros.trimestre && (
                        <span className="select-tag">
                          {filtros.trimestre}
                          <button
                            type="button"
                            className="tag-remove"
                            onClick={() => handleRemoveTag('trimestre')}
                          >
                            ✕
                          </button>
                        </span>
                      )}
                      <select
                        id="filtro-trimestre"
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleFilterChange('trimestre', e.target.value)
                            e.target.value = ''
                          }
                        }}
                        className="filtro-select"
                      >
                        <option value="">Selecione trimestre</option>
                        {TRIMESTRES.filter((trim) => trim !== filtros.trimestre).map((trim) => (
                          <option key={trim} value={trim}>
                            {trim}
                          </option>
                        ))}
                      </select>
                    </div>
                    {filtros.trimestre && (
                      <button
                        type="button"
                        className="clear-select"
                        onClick={() => handleRemoveTag('trimestre')}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="visita-form">
        <div className="tabs-container">
          <div className="tabs-header">
            <button
              type="button"
              className={`tab-button ${abaAtiva === 'geral' ? 'active' : ''}`}
              onClick={() => setAbaAtiva('geral')}
            >
              Questão Geral
            </button>
            {gruposQuestoes.map((grupo) => (
              <button
                key={grupo.id}
                type="button"
                className={`tab-button ${abaAtiva === grupo.id ? 'active' : ''}`}
                onClick={() => setAbaAtiva(grupo.id)}
              >
                {grupo.nome}
              </button>
            ))}
            <button
              type="button"
              className={`tab-button ${abaAtiva === 'fotos' ? 'active' : ''}`}
              onClick={() => setAbaAtiva('fotos')}
            >
              📷 Upload de Fotos
            </button>
          </div>

          <div className="tabs-content">
            {abaAtiva === 'geral' && (
              <div className="tab-panel">
                <div className="card questao-geral">
                  <h3>Questão Geral</h3>
                  <div className="form-group">
                    <label htmlFor="escolaPrioritaria">É uma escola Prioritária? *</label>
                    <div className="questao-sim-nao">
                      <label className="radio-option">
                        <input
                          type="radio"
                          id="escolaPrioritaria"
                          name="escolaPrioritaria"
                          value="sim"
                          checked={escolaPrioritaria === 'sim'}
                          onChange={(e) => setEscolaPrioritaria(e.target.value)}
                          required
                        />
                        <span>Sim</span>
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="escolaPrioritaria"
                          value="nao"
                          checked={escolaPrioritaria === 'nao'}
                          onChange={(e) => setEscolaPrioritaria(e.target.value)}
                          required
                        />
                        <span>Não</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {gruposQuestoes.map((grupo) => {
              if (abaAtiva === grupo.id) {
                return (
                  <div key={grupo.id} className="tab-panel">
                    <div className="card grupo-questoes">
                      <h3>{grupo.nome}</h3>
                      <div className="questoes-list">
                        {grupo.questoes.map((questao) => (
                          <div key={questao.id} className="questao-item">
                            <label className="questao-label">
                              {questao.texto}
                              {questao.obrigatoria && <span className="required"> *</span>}
                            </label>
                            {renderQuestao(questao)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            })}

            {abaAtiva === 'fotos' && (
              <div className="tab-panel">
                <div className="card grupo-questoes">
                  <h3>Upload de Fotos</h3>
                  <p className="fotos-description">
                    Adicione fotos da visita técnica para documentação
                  </p>

                  <div className="fotos-upload-area">
                    <label htmlFor="foto-upload" className="foto-upload-label">
                      <span className="upload-icon">📷</span>
                      <span className="upload-text">
                        Clique para selecionar fotos ou arraste arquivos aqui
                      </span>
                      <input
                        type="file"
                        id="foto-upload"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files)
                          const novasFotos = files.map((file) => ({
                            id: Date.now() + Math.random(),
                            file,
                            preview: URL.createObjectURL(file),
                            nome: file.name,
                          }))
                          setFotos([...fotos, ...novasFotos])
                        }}
                        className="foto-input"
                      />
                    </label>
                    <p className="upload-hint">
                      Formatos aceitos: JPG, PNG, GIF (máx. 5MB por foto)
                    </p>
                  </div>

                  {fotos.length > 0 && (
                    <div className="fotos-grid">
                      {fotos.map((foto) => (
                        <div key={foto.id} className="foto-item">
                          <div className="foto-preview">
                            <img src={foto.preview} alt={foto.nome} />
                            <button
                              type="button"
                              className="foto-remove"
                              onClick={() => {
                                URL.revokeObjectURL(foto.preview)
                                setFotos(fotos.filter((f) => f.id !== foto.id))
                              }}
                            >
                              ✕
                            </button>
                          </div>
                          <div className="foto-info">
                            <p className="foto-nome" title={foto.nome}>
                              {foto.nome}
                            </p>
                            <p className="foto-tamanho">
                              {(foto.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary">
            Salvar Rascunho
          </button>
          <button type="submit" className="btn btn-primary">
            Finalizar Visita
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormularioVisita

