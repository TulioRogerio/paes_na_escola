# Sistema de Visitas Técnicas GERCO

Sistema web para gestão de visitas técnicas trimestrais nas escolas do Espírito Santo, com registro de questões por grupos temáticos e upload de atas validadas.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **React Router** - Roteamento para aplicações React
- **Vite** - Build tool moderna e rápida
- **CSS3** - Estilização com variáveis CSS e design moderno

## 📋 Páginas do Sistema

1. **Dashboard** (`/`) - Visão geral das visitas técnicas com indicadores e atividades recentes
2. **Agendamento** (`/agendamento`) - Agendar visitas técnicas trimestrais por SRE → Município → Escola
3. **Formulário de Visita** (`/visita`) - Preencher questões da visita técnica (6 grupos + questão geral)
4. **Upload de ATA** (`/upload-ata`) - Enviar ATA da visita técnica validada pelos participantes
5. **Consultas** (`/consultas`) - Consultar visitas por hierarquia (SRE → Município → Escola) e filtros
6. **Relatórios** (`/relatorios`) - Geração e exportação de relatórios das visitas
7. **Configuração de Questões** (`/config-questoes`) - Configurar questões de cada grupo antes do ano letivo

## 🏗️ Estrutura Hierárquica

O sistema organiza as informações em 4 níveis:
- **Regionais (SRE's)** - Superintendências Regionais de Educação
- **Municípios** - Municípios pertencentes a cada SRE
- **Escolas** - Escolas de cada município
- **Visitas Técnicas** - Visitas trimestrais realizadas nas escolas

## 📝 Grupos de Questões

Cada visita técnica registra respostas para 6 grupos de questões:
1. **PEC** - Programa de Ensino Colaborativo
2. **MATERIAL DIDÁTICO COMPLEMENTAR** - Uso e distribuição de materiais
3. **FORMAÇÃO** - Formações continuadas dos professores
4. **ROTINAS PEDAGÓGICAS** - Rotinas e práticas pedagógicas
5. **GESTÃO, DADOS E ESTRATÉGIAS** - Gestão baseada em dados
6. **PRÊMIO ESCOLA QUE COLABORA** - Participação e resultados

### Questão Geral
- **É uma escola Prioritária?** (Sim/Não) - Questão obrigatória em todas as visitas

## 🔧 Tipos de Questões

As questões podem ser configuradas com os seguintes tipos:
- **Sim/Não** - Resposta binária
- **Múltipla Escolha** - Seleção de uma opção entre várias
- **Texto Curto** - Resposta textual curta
- **Texto Longo** - Resposta textual extensa

*Nota: No banco de dados, todas as respostas são armazenadas como texto.*

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
│   ├── Layout.jsx   # Layout principal com sidebar
│   └── Layout.css
├── pages/           # Páginas do sistema
│   ├── Dashboard.jsx
│   ├── Agendamento.jsx
│   ├── FormularioVisita.jsx
│   ├── UploadATA.jsx
│   ├── Consultas.jsx
│   ├── Relatorios.jsx
│   └── ConfigQuestoes.jsx
├── App.jsx          # Componente principal com rotas
├── main.jsx         # Ponto de entrada
└── index.css        # Estilos globais
```

## 🎨 Características

- ✅ Design moderno e responsivo
- ✅ Sidebar colapsável
- ✅ Navegação intuitiva
- ✅ Formulários validados
- ✅ Tabelas com filtros
- ✅ Sistema de badges para status
- ✅ Interface adaptável para mobile

## 📝 Funcionalidades Implementadas

- ✅ Agendamento de visitas técnicas trimestrais
- ✅ Formulário dinâmico com 6 grupos de questões configuráveis
- ✅ Questão geral sobre escola prioritária
- ✅ Upload de ATA de visita técnica
- ✅ Consultas hierárquicas (SRE → Município → Escola)
- ✅ Configuração de questões antes do ano letivo
- ✅ Dashboard com indicadores de visitas
- ✅ Filtros e buscas avançadas

## 📝 Próximos Passos

- [ ] Integração com API backend
- [ ] Autenticação de usuários e controle de acesso
- [ ] Validação de ATA por múltiplos membros
- [ ] Gráficos interativos de análise
- [ ] Exportação de relatórios em PDF/Excel
- [ ] Notificações de agendamentos e prazos
- [ ] Histórico completo de visitas por escola
- [ ] Integração com planilha Excel original

## 📄 Licença

Este projeto é um protótipo desenvolvido para o sistema de monitoramento GERCO.

