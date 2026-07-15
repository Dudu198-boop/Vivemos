# 🚀 Como Colocar o Site VIVEMOS no GitHub

## Passo 1: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito → **"New repository"**
3. Configure o repositório:
   - **Repository name:** `vivemos-website` (ou outro nome de sua preferência)
   - **Description:** "Site institucional da VIVEMOS - Viver Verde Moçambique"
   - **Visibilidade:** Public (para usar GitHub Pages gratuitamente)
   - **NÃO** marque "Add a README file" (já temos um)
   - **NÃO** adicione .gitignore (já temos um)
4. Clique em **"Create repository"**

## Passo 2: Inicializar Git Localmente

Abra o **Git Bash** ou **PowerShell** na pasta do projeto e execute:

```bash
# Navegar para a pasta do projeto
cd "c:\Users\Windows 10\Documents\vivemos"

# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit: Site VIVEMOS completo"
```

## Passo 3: Conectar ao GitHub

Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub:

```bash
# Adicionar remote do GitHub
git remote add origin https://github.com/SEU-USUARIO/vivemos-website.git

# Verificar se foi adicionado
git remote -v

# Fazer push para o GitHub
git branch -M main
git push -u origin main
```

Se pedir credenciais:
- **Username:** Seu nome de usuário do GitHub
- **Password:** Use um **Personal Access Token** (não a senha)

### Como criar Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Marque "repo" → Generate token
3. Copie o token e use como senha

## Passo 4: Ativar GitHub Pages

1. No repositório do GitHub, vá em **Settings** (Configurações)
2. No menu lateral, clique em **Pages**
3. Em **"Source"**, selecione:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Clique em **"Save"**
5. Aguarde 1-2 minutos

Seu site estará disponível em:
```
https://SEU-USUARIO.github.io/vivemos-website/
```

## 📝 Comandos Git Úteis

### Fazer alterações no futuro:

```bash
# Ver status dos arquivos
git status

# Adicionar arquivos modificados
git add .

# Fazer commit
git commit -m "Descrição das alterações"

# Enviar para GitHub
git push
```

### Ver histórico:

```bash
# Ver commits
git log --oneline

# Ver alterações
git diff
```

### Criar branches (opcional):

```bash
# Criar nova branch
git checkout -b nova-funcionalidade

# Voltar para main
git checkout main

# Merge de branch
git merge nova-funcionalidade
```

## 🔧 Troubleshooting

### Erro: "Permission denied"
```bash
# Configurar usuário
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@example.com"
```

### Erro: "Remote already exists"
```bash
# Remover remote antigo
git remote remove origin

# Adicionar novamente
git remote add origin https://github.com/SEU-USUARIO/vivemos-website.git
```

### Erro ao fazer push
```bash
# Forçar push (cuidado!)
git push -f origin main
```

## 🌐 Domínio Personalizado (Opcional)

Para usar um domínio próprio (ex: www.vivemos.org.mz):

1. Crie um arquivo `CNAME` na raiz do projeto:
```bash
echo "www.vivemos.org.mz" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

2. Configure DNS do seu domínio:
   - Adicione um registro CNAME apontando para: `SEU-USUARIO.github.io`

3. No GitHub Pages Settings, adicione o domínio personalizado

## ✅ Checklist Final

Antes de fazer o push, verifique:

- [ ] Todas as imagens estão na pasta `assets/images/`
- [ ] Links internos estão funcionando
- [ ] Não há senhas ou dados sensíveis no código
- [ ] README.md está atualizado
- [ ] .gitignore está configurado
- [ ] Todas as páginas abrem corretamente

## 📱 Testando o Site

Após publicar, teste:

- [ ] Desktop (Chrome, Firefox, Edge)
- [ ] Mobile (iOS Safari, Chrome Android)
- [ ] Tablet (iPad, Android)
- [ ] Performance (PageSpeed Insights)
- [ ] Links funcionando
- [ ] Imagens carregando
- [ ] Formulários enviando

## 🆘 Precisa de Ajuda?

- [Documentação do GitHub](https://docs.github.com)
- [GitHub Pages Docs](https://pages.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Boa sorte! 🚀**
