# Guia de Deploy no GitHub Pages

Este guia explica como fazer o deploy do projeto PAES na Escola no GitHub Pages.

## Pré-requisitos

1. Ter uma conta no GitHub
2. Ter o repositório criado no GitHub (ex: `TulioRogerio/paes_na_escola`)
3. Ter o Git instalado e configurado localmente

## Passo a Passo

### 1. Configurar o repositório remoto (se ainda não configurou)

```bash
# Verificar se já existe um repositório git
git status

# Se não existir, inicializar
git init

# Adicionar o repositório remoto (substitua pela URL do seu repositório)
git remote add origin https://github.com/TulioRogerio/paes_na_escola.git
```

### 2. Fazer o primeiro commit e push

```bash
# Adicionar todos os arquivos
git add .

# Fazer o commit inicial
git commit -m "Initial commit - PAES na Escola"

# Enviar para o GitHub (na branch main)
git branch -M main
git push -u origin main
```

### 3. Habilitar GitHub Pages no repositório

1. Acesse seu repositório no GitHub: `https://github.com/TulioRogerio/paes_na_escola`
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. Clique em **Save**

### 4. Deploy Automático (Recomendado)

O projeto já está configurado com GitHub Actions para fazer deploy automático:

- **Toda vez que você fizer push na branch `main`**, o GitHub Actions irá:
  1. Fazer build do projeto
  2. Fazer deploy automaticamente no GitHub Pages

**Não é necessário fazer nada além de fazer push!**

### 5. Deploy Manual (Alternativa)

Se preferir fazer deploy manual, você pode usar:

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Fazer build e deploy
npm run deploy
```

## Acessar o site

Após o deploy, seu site estará disponível em:

- `https://tuliorogerio.github.io/paes_na_escola/`

**Nota**: Pode levar alguns minutos para o site ficar disponível após o primeiro deploy.

## Atualizar o site

Para atualizar o site, basta fazer push das alterações:

```bash
git add .
git commit -m "Descrição das alterações"
git push origin main
```

O GitHub Actions fará o deploy automaticamente!

## Solução de Problemas

### O site não está aparecendo

1. Verifique se o GitHub Actions completou com sucesso (aba Actions no repositório)
2. Verifique se o GitHub Pages está habilitado nas configurações
3. Aguarde alguns minutos (o deploy pode levar até 10 minutos)

### Erro 404 ao acessar o site

1. Verifique se o `base` no `vite.config.js` está correto: `/paes_na_escola/`
2. Certifique-se de que o nome do repositório está correto

### Build falha

1. Verifique os logs do GitHub Actions
2. Certifique-se de que todas as dependências estão no `package.json`
3. Execute `npm install` localmente para verificar se há erros
