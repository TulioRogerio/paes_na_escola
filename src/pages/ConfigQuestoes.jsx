import { useState } from 'react'
import './ConfigQuestoes.css'

const ConfigQuestoes = () => {
  const [grupos, setGrupos] = useState([
    { id: 'pec', nome: 'PEC' },
    { id: 'material', nome: 'MATERIAL DIDÁTICO COMPLEMENTAR' },
    { id: 'formacao', nome: 'FORMAÇÃO' },
    { id: 'rotinas', nome: 'ROTINAS PEDAGÓGICAS' },
    { id: 'gestao', nome: 'GESTÃO, DADOS E ESTRATÉGIAS' },
    { id: 'premio', nome: 'PRÊMIO ESCOLA QUE COLABORA' },
  ])
  const [grupoSelecionado, setGrupoSelecionado] = useState('pec')
  const [questoes, setQuestoes] = useState({
    pec: [
      {
        id: 'pec1',
        texto: 'A escola possui PEC implementado?',
        tipo: 'sim_nao',
        obrigatoria: true,
      },
    ],
    material: [],
    formacao: [],
    rotinas: [],
    gestao: [],
    premio: [],
  })
  const [mostrarModalGrupo, setMostrarModalGrupo] = useState(false)
  const [grupoEditando, setGrupoEditando] = useState(null)
  const [novoGrupoNome, setNovoGrupoNome] = useState('')

  const tiposQuestao = [
    { value: 'sim_nao', label: 'Sim/Não' },
    { value: 'multipla_escolha', label: 'Múltipla Escolha' },
    { value: 'texto_curto', label: 'Texto Curto' },
    { value: 'texto_longo', label: 'Texto Longo' },
  ]

  const [novaQuestao, setNovaQuestao] = useState({
    texto: '',
    tipo: 'sim_nao',
    obrigatoria: false,
    opcoes: '',
  })

  const handleAddQuestao = () => {
    if (!novaQuestao.texto.trim()) {
      alert('Por favor, preencha o texto da questão')
      return
    }

    const questao = {
      id: `${grupoSelecionado}${questoes[grupoSelecionado].length + 1}`,
      texto: novaQuestao.texto,
      tipo: novaQuestao.tipo,
      obrigatoria: novaQuestao.obrigatoria,
    }

    if (novaQuestao.tipo === 'multipla_escolha' && novaQuestao.opcoes) {
      questao.opcoes = novaQuestao.opcoes.split(',').map((op) => op.trim())
    }

    setQuestoes((prev) => ({
      ...prev,
      [grupoSelecionado]: [...prev[grupoSelecionado], questao],
    }))

    setNovaQuestao({
      texto: '',
      tipo: 'sim_nao',
      obrigatoria: false,
      opcoes: '',
    })
  }

  const handleRemoveQuestao = (questaoId) => {
    setQuestoes((prev) => ({
      ...prev,
      [grupoSelecionado]: prev[grupoSelecionado].filter((q) => q.id !== questaoId),
    }))
  }

  const handleSave = () => {
    console.log('Questões configuradas:', questoes)
    alert('Configuração de questões salva com sucesso!')
  }

  const handleInserirGrupo = () => {
    setGrupoEditando(null)
    setNovoGrupoNome('')
    setMostrarModalGrupo(true)
  }

  const handleEditarGrupo = (grupo) => {
    setGrupoEditando(grupo)
    setNovoGrupoNome(grupo.nome)
    setMostrarModalGrupo(true)
  }

  const handleExcluirGrupo = (grupoId) => {
    if (window.confirm('Tem certeza que deseja excluir este grupo? Todas as questões deste grupo serão perdidas.')) {
      setGrupos((prev) => prev.filter((g) => g.id !== grupoId))
      setQuestoes((prev) => {
        const novo = { ...prev }
        delete novo[grupoId]
        return novo
      })
      if (grupoSelecionado === grupoId) {
        const gruposRestantes = grupos.filter((g) => g.id !== grupoId)
        if (gruposRestantes.length > 0) {
          setGrupoSelecionado(gruposRestantes[0].id)
        }
      }
    }
  }

  const handleSalvarGrupo = () => {
    if (!novoGrupoNome.trim()) {
      alert('Por favor, preencha o nome do grupo')
      return
    }

    if (grupoEditando) {
      // Editar grupo existente
      setGrupos((prev) =>
        prev.map((g) =>
          g.id === grupoEditando.id ? { ...g, nome: novoGrupoNome.trim() } : g
        )
      )
    } else {
      // Inserir novo grupo
      const novoId = novoGrupoNome.trim().toLowerCase().replace(/\s+/g, '_')
      setGrupos((prev) => [...prev, { id: novoId, nome: novoGrupoNome.trim() }])
      setQuestoes((prev) => ({ ...prev, [novoId]: [] }))
      setGrupoSelecionado(novoId)
    }

    setMostrarModalGrupo(false)
    setNovoGrupoNome('')
    setGrupoEditando(null)
  }

  return (
    <div className="config-questoes">
      <div className="page-header">
        <h2>Configurações</h2>
        <p>
          Configure os grupos de assuntos, questões e gráficos do dashboard
        </p>
      </div>

      {/* Grupo 1: Grupo de Assuntos */}
      <div className="config-group">
        <div className="config-group-header">
          <h3>Grupo de Assuntos</h3>
          <div className="grupos-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleInserirGrupo}
            >
              + Inserir Grupo
            </button>
          </div>
        </div>
        <div className="card">
          <div className="grupos-list">
            {grupos.map((grupo) => (
              <div
                key={grupo.id}
                className={`grupo-card ${
                  grupoSelecionado === grupo.id ? 'active' : ''
                }`}
              >
                <div className="grupo-card-header">
                  <button
                    className="grupo-card-content"
                    onClick={() => setGrupoSelecionado(grupo.id)}
                  >
                    <div className="grupo-info">
                      <span className="grupo-nome">{grupo.nome}</span>
                      <span className="grupo-count">
                        {questoes[grupo.id]?.length || 0} questões
                      </span>
                    </div>
                  </button>
                  <div className="grupo-card-actions">
                    <button
                      type="button"
                      className="btn-icon btn-edit"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditarGrupo(grupo)
                      }}
                      title="Editar Grupo"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      className="btn-icon btn-delete"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleExcluirGrupo(grupo.id)
                      }}
                      title="Excluir Grupo"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grupo 2: Grupo de Questões por Assunto */}
      <div className="config-group">
        <div className="config-group-header">
          <h3>Grupo de Questões por Assunto</h3>
        </div>
        <div className="card">
          <h4>
            {grupos.find((g) => g.id === grupoSelecionado)?.nome}
          </h4>

          <div className="questoes-list">
            {questoes[grupoSelecionado].length === 0 ? (
              <p className="empty-state">
                Nenhuma questão configurada para este grupo
              </p>
            ) : (
              questoes[grupoSelecionado].map((questao, index) => (
                <div key={questao.id} className="questao-config-item">
                  <div className="questao-config-header">
                    <span className="questao-number">{index + 1}</span>
                    <div className="questao-config-info">
                      <p className="questao-texto">{questao.texto}</p>
                      <div className="questao-tags">
                        <span className="tag tipo">{questao.tipo}</span>
                        {questao.obrigatoria && (
                          <span className="tag obrigatoria">Obrigatória</span>
                        )}
                        {questao.opcoes && (
                          <span className="tag opcoes">
                            {questao.opcoes.length} opções
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() => handleRemoveQuestao(questao.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="nova-questao">
            <h4>Adicionar Nova Questão</h4>
            <div className="nova-questao-form">
              <div className="form-group">
                <label htmlFor="textoQuestao">Texto da Questão *</label>
                <textarea
                  id="textoQuestao"
                  value={novaQuestao.texto}
                  onChange={(e) =>
                    setNovaQuestao({ ...novaQuestao, texto: e.target.value })
                  }
                  rows="2"
                  placeholder="Digite o texto da questão"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tipoQuestao">Tipo *</label>
                  <select
                    id="tipoQuestao"
                    value={novaQuestao.tipo}
                    onChange={(e) =>
                      setNovaQuestao({ ...novaQuestao, tipo: e.target.value })
                    }
                  >
                    {tiposQuestao.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={novaQuestao.obrigatoria}
                      onChange={(e) =>
                        setNovaQuestao({
                          ...novaQuestao,
                          obrigatoria: e.target.checked,
                        })
                      }
                    />
                    <span>Obrigatória</span>
                  </label>
                </div>
              </div>

              {novaQuestao.tipo === 'multipla_escolha' && (
                <div className="form-group">
                  <label htmlFor="opcoes">Opções (separadas por vírgula) *</label>
                  <input
                    id="opcoes"
                    type="text"
                    value={novaQuestao.opcoes}
                    onChange={(e) =>
                      setNovaQuestao({ ...novaQuestao, opcoes: e.target.value })
                    }
                    placeholder="Ex: Opção 1, Opção 2, Opção 3"
                  />
                </div>
              )}

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddQuestao}
              >
                Adicionar Questão
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grupo 3: Gráficos Apresentados no Dashboard */}
      <div className="config-group">
        <div className="config-group-header">
          <h3>Gráficos Apresentados no Dashboard</h3>
        </div>
        <div className="card">
          <div className="desenvolvimento-placeholder">
            <p className="desenvolvimento-text">🚧 A desenvolver</p>
          </div>
        </div>
      </div>

      <div className="config-actions">
        <button className="btn btn-secondary">Cancelar</button>
        <button className="btn btn-primary" onClick={handleSave}>
          Salvar Configuração
        </button>
      </div>

      {/* Modal para Inserir/Editar Grupo */}
      {mostrarModalGrupo && (
        <div className="modal-overlay" onClick={() => setMostrarModalGrupo(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{grupoEditando ? 'Editar Grupo' : 'Inserir Novo Grupo'}</h3>
              <button
                className="modal-close"
                onClick={() => setMostrarModalGrupo(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="nomeGrupo">Nome do Grupo *</label>
                <input
                  id="nomeGrupo"
                  type="text"
                  value={novoGrupoNome}
                  onChange={(e) => setNovoGrupoNome(e.target.value)}
                  placeholder="Digite o nome do grupo"
                  autoFocus
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setMostrarModalGrupo(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleSalvarGrupo}>
                {grupoEditando ? 'Salvar Alterações' : 'Inserir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConfigQuestoes

