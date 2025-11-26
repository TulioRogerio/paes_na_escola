import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Agendadas.css";

const SRES = ["SRE Vitória", "SRE Cachoeiro", "SRE Colatina", "SRE Linhares"];
const MUNICIPIOS = {
  "SRE Vitória": ["Vitória", "Vila Velha", "Serra", "Cariacica"],
  "SRE Cachoeiro": ["Cachoeiro de Itapemirim", "Castelo", "Itapemirim"],
  "SRE Colatina": ["Colatina", "Baixo Guandu", "São Gabriel da Palha"],
  "SRE Linhares": ["Linhares", "São Mateus", "Aracruz"],
};
const TRIMESTRES = ["1º Trimestre", "2º Trimestre", "3º Trimestre"];

const STATUS_MAP = {
  agendado: { class: "status-agendado", label: "Agendado" },
  realizada: { class: "status-realizada", label: "Realizada" },
  cancelada: { class: "status-cancelada", label: "Cancelada" },
};

const AGENDAMENTOS_INICIAIS = [
  {
    id: 1,
    sre: "SRE Vitória",
    municipio: "Vitória",
    escola: "EEEF João Silva",
    data: "2024-04-15",
    horario: "09:00",
    trimestre: "1º Trimestre",
    status: "agendado",
  },
  {
    id: 2,
    sre: "SRE Vitória",
    municipio: "Vila Velha",
    escola: "EEEF Vila Velha 1",
    data: "2024-04-20",
    horario: "14:00",
    trimestre: "1º Trimestre",
    status: "agendado",
  },
  {
    id: 3,
    sre: "SRE Cachoeiro",
    municipio: "Cachoeiro de Itapemirim",
    escola: "EEEF Cachoeiro Central",
    data: "2024-04-25",
    horario: "10:00",
    trimestre: "1º Trimestre",
    status: "realizada",
  },
];

const Agendadas = () => {
  const [filtros, setFiltros] = useState({
    sre: "",
    municipio: "",
    trimestre: "",
    status: "",
  });
  const [agendamentos] = useState(AGENDAMENTOS_INICIAIS);

  const municipiosDisponiveis = useMemo(
    () => (filtros.sre ? MUNICIPIOS[filtros.sre] || [] : []),
    [filtros.sre]
  );

  const agendamentosFiltrados = useMemo(
    () =>
      agendamentos.filter((agendamento) => {
        return (
          (!filtros.sre || agendamento.sre === filtros.sre) &&
          (!filtros.municipio || agendamento.municipio === filtros.municipio) &&
          (!filtros.trimestre || agendamento.trimestre === filtros.trimestre) &&
          (!filtros.status || agendamento.status === filtros.status)
        );
      }),
    [agendamentos, filtros]
  );

  const handleBreadcrumbClick = useCallback((level, value = "") => {
    if (level === "home") {
      setFiltros((prev) => ({
        ...prev,
        sre: "",
        municipio: "",
      }));
    } else if (level === "sre") {
      setFiltros((prev) => ({
        ...prev,
        sre: value,
        municipio: "",
      }));
    } else if (level === "municipio") {
      setFiltros((prev) => ({
        ...prev,
        municipio: value,
      }));
    }
  }, []);

  const handleFilterChange = useCallback((name, value) => {
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const getStatusClass = useCallback(
    (status) => STATUS_MAP[status]?.class || "status-agendado",
    []
  );

  const getStatusLabel = useCallback(
    (status) => STATUS_MAP[status]?.label || status,
    []
  );

  return (
    <div className="agendadas">
      <div className="page-header">
        <div>
          <h2>Visitas Agendadas</h2>
        </div>
      </div>

      <div className="visitas-panel">
        <div className="visitas-header">
          <span className="visitas-count">
            {agendamentosFiltrados.length} visita(s) encontrada(s)
          </span>
        </div>

        <div className="visitas-list">
          {agendamentosFiltrados.length === 0 ? (
            <div className="empty-state">
              <p>Nenhuma visita encontrada</p>
              <Link to="/agendamento" className="btn btn-primary">
                Agendar Primeira Visita
              </Link>
            </div>
          ) : (
            agendamentosFiltrados.map((agendamento) => (
              <div key={agendamento.id} className="visita-item card">
                <div className="visita-header">
                  <div className="visita-info-principal">
                    <h4 className="visita-escola">{agendamento.escola}</h4>
                    <div className="visita-meta">
                      <span>{agendamento.sre}</span>
                      <span>•</span>
                      <span>{agendamento.municipio}</span>
                    </div>
                  </div>
                  <span
                    className={`status-badge ${getStatusClass(
                      agendamento.status
                    )}`}
                  >
                    {getStatusLabel(agendamento.status)}
                  </span>
                </div>

                <div className="visita-details">
                  <div className="detail-item">
                    <span className="detail-label">📅 Data:</span>
                    <span className="detail-value">
                      {new Date(agendamento.data).toLocaleDateString("pt-BR")}{" "}
                      às {agendamento.horario}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">📆 Trimestre:</span>
                    <span className="detail-value">
                      {agendamento.trimestre}
                    </span>
                  </div>
                </div>

                <div className="visita-actions">
                  <Link to={`/visita/${agendamento.id}`} className="btn-link">
                    Iniciar Visita
                  </Link>
                  <button className="btn-link">Editar</button>
                  <button className="btn-link btn-link-danger">Cancelar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Agendadas;
