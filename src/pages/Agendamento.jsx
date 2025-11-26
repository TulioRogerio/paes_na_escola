import { useState, useMemo, useCallback } from "react";
import "./Agendamento.css";

const SRES = ["SRE Vitória", "SRE Cachoeiro", "SRE Colatina", "SRE Linhares"];
const MUNICIPIOS = {
  "SRE Vitória": ["Vitória", "Vila Velha", "Serra", "Cariacica"],
  "SRE Cachoeiro": ["Cachoeiro de Itapemirim", "Castelo", "Itapemirim"],
  "SRE Colatina": ["Colatina", "Baixo Guandu", "São Gabriel da Palha"],
  "SRE Linhares": ["Linhares", "São Mateus", "Aracruz"],
};
const ESCOLAS = {
  Vitória: ["EEEF João Silva", "EEEF Maria Santos", "EEEF Pedro Costa"],
  "Vila Velha": ["EEEF Vila Velha 1", "EEEF Vila Velha 2"],
};
const TRIMESTRES = ["1º Trimestre", "2º Trimestre", "3º Trimestre"];

const FORM_INITIAL_STATE = {
  sre: "",
  municipio: "",
  escola: "",
  data: "",
  horario: "",
  trimestre: "",
  equipe: "",
  observacoes: "",
};

const Agendamento = () => {
  const [formData, setFormData] = useState(FORM_INITIAL_STATE);

  const municipiosDisponiveis = useMemo(
    () => (formData.sre ? MUNICIPIOS[formData.sre] || [] : []),
    [formData.sre]
  );

  const escolasDisponiveis = useMemo(
    () => (formData.municipio ? ESCOLAS[formData.municipio] || [] : []),
    [formData.municipio]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Limpar campos dependentes
      ...(name === "sre" && { municipio: "", escola: "" }),
      ...(name === "municipio" && { escola: "" }),
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Dados do agendamento:", formData);
      alert("Visita técnica agendada com sucesso!");
      setFormData(FORM_INITIAL_STATE);
    },
    [formData]
  );

  return (
    <div className="agendamento">
      <div className="page-header">
        <div>
          <h2>Agendamento de Visitas Técnicas</h2>
        </div>
      </div>

      <div className="agendamento-content">
        <div className="form-panel">
          <div className="card">
            <form onSubmit={handleSubmit} className="agendamento-form">
              <div className="form-section">
                <div className="section-header">
                  <span className="section-icon">📍</span>
                  <h4>Localização</h4>
                </div>
                <div className="localizacao-grid">
                  <div className="form-group">
                    <label htmlFor="sre">
                      <span className="label-number">1</span>
                      Regional (SRE) *
                    </label>
                    <select
                      id="sre"
                      name="sre"
                      value={formData.sre}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">Selecione a SRE</option>
                      {SRES.map((sre) => (
                        <option key={sre} value={sre}>
                          {sre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="municipio">
                      <span className="label-number">2</span>
                      Município *
                    </label>
                    <select
                      id="municipio"
                      name="municipio"
                      value={formData.municipio}
                      onChange={handleChange}
                      required
                      disabled={!formData.sre}
                      className="form-select"
                    >
                      <option value="">Selecione o município</option>
                      {municipiosDisponiveis.map((mun) => (
                        <option key={mun} value={mun}>
                          {mun}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="escola">
                      <span className="label-number">3</span>
                      Escola *
                    </label>
                    <select
                      id="escola"
                      name="escola"
                      value={formData.escola}
                      onChange={handleChange}
                      required
                      disabled={!formData.municipio}
                      className="form-select"
                    >
                      <option value="">Selecione a escola</option>
                      {escolasDisponiveis.map((esc) => (
                        <option key={esc} value={esc}>
                          {esc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-header">
                  <span className="section-icon">📅</span>
                  <h4>Data e Período</h4>
                </div>
                <div className="periodo-grid">
                  <div className="form-group form-group-large">
                    <label htmlFor="trimestre">Trimestre *</label>
                    <select
                      id="trimestre"
                      name="trimestre"
                      value={formData.trimestre}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">Selecione o trimestre</option>
                      {TRIMESTRES.map((trim) => (
                        <option key={trim} value={trim}>
                          {trim}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="data">Data da Visita *</label>
                    <input
                      type="date"
                      id="data"
                      name="data"
                      value={formData.data}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="horario">Horário *</label>
                    <input
                      type="time"
                      id="horario"
                      name="horario"
                      value={formData.horario}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-header">
                  <span className="section-icon">👥</span>
                  <h4>Equipe e Observações</h4>
                </div>
                <div className="equipe-grid">
                  <div className="form-group">
                    <label htmlFor="equipe">Membros da Equipe</label>
                    <textarea
                      id="equipe"
                      name="equipe"
                      value={formData.equipe}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Liste os membros da equipe que participarão da visita"
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="observacoes">Observações</label>
                    <textarea
                      id="observacoes"
                      name="observacoes"
                      value={formData.observacoes}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Observações adicionais sobre a visita"
                      className="form-textarea"
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Agendar Visita
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendamento;
