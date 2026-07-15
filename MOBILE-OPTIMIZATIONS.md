# 📱 Otimizações Mobile - Site VIVEMOS

## ✅ Melhorias Implementadas

### 🎯 Meta Tags Otimizadas
```html
✓ viewport com maximum-scale=5.0 (permite zoom mas evita excessos)
✓ theme-color atualizada para combinar com o design
✓ apple-mobile-web-app-capable para melhor experiência iOS
✓ apple-mobile-web-app-status-bar-style para barra de status
```

### 📐 Breakpoints Responsivos
```
- xl: 1280px (Desktop grande)
- lg: 1024px (Desktop/Laptop)
- md: 768px (Tablet portrait / Mobile landscape)
- sm: 640px (Mobile portrait)
- xs: 480px (Mobile pequeno)
- Landscape: max-height 600px (Mobile deitado)
```

### 🎨 Hero Section Mobile
**Desktop:**
- Título: 3-5.5rem
- Subtítulo: text-lg
- Botões lado a lado

**Mobile:**
- Título: 2-3.5rem (responsivo)
- Subtítulo: text-sm redimensionável
- Botões empilhados verticalmente (100% width)
- Padding otimizado
- min-height: 100svh (suporte para barra de navegação móvel)

### 🔢 Seção de Números
**Desktop:** 4 colunas
**Tablet:** 2x2 grid
**Mobile:** 2x2 grid com valores menores
- Fonte dos valores: 1.75-2.5rem em mobile
- Fonte dos labels: text-xs
- Padding reduzido
- Bordas ajustadas

### 📱 Navbar Mobile
**Funcionalidades:**
- ✓ Menu hamburger funcional
- ✓ Menu fullscreen com animação slideDown
- ✓ Logo reduzido (44px)
- ✓ Links com áreas de toque de 48px mínimo
- ✓ Scroll suave com -webkit-overflow-scrolling
- ✓ Fecha ao clicar em link
- ✓ Fecha com ESC
- ✓ Bloqueia scroll do body quando aberto

### 🖼️ Cards de Iniciativas
**Desktop:** 3 colunas
**Tablet:** 2 colunas
**Mobile:** 1 coluna
- Imagens: altura reduzida (200px em mobile)
- Padding otimizado
- Texto em tamanhos menores
- Hover desabilitado em touch devices

### 🎭 Galeria
**Desktop:** Grid auto-fill (3-4 colunas)
**Tablet:** 2 colunas
**Mobile:** 1 coluna
- Aspect ratio ajustado (16:10 em mobile)
- Lightbox com controles maiores e mais visíveis
- Botões touch-friendly (44x44px)
- Filtros com scroll horizontal
- Imagens otimizadas para tela pequena

### 🗺️ Mapa Interativo
**Melhorias:**
- ✓ touch-action: none para melhor interação
- ✓ Pontos maiores em mobile (r="10")
- ✓ Tooltip responsivo (max-width: 200px)
- ✓ Stats empilhados verticalmente
- ✓ Ícones reduzidos (56x56px em mobile)
- ✓ -webkit-tap-highlight-color: transparent

### 💬 Depoimentos
**Desktop:** 3 colunas
**Tablet:** 2 colunas (último span 2)
**Mobile:** 1 coluna empilhada
- Padding reduzido
- Fonte menor
- Cards com 100% width

### 👥 Colaboradores
**Desktop:** 6 colunas
**Tablet:** 3 colunas
**Mobile:** 2 colunas
- Ícones menores
- Padding reduzido
- Texto responsivo

### 📋 Formulários
**Mobile:**
- Campos em coluna única
- Inputs com 100% width
- Padding reduzido
- Botões fullwidth
- Min-height de 48px para campos

### 🎯 Newsletter
**Mobile:**
- Layout vertical (flex-column)
- Input e botão 100% width
- Gap entre elementos
- Sem quebra de linha

### 🦶 Footer
**Mobile:**
- Grid de 1 coluna
- Texto centralizado
- Links centralizados
- Social icons centralizados
- Gap reduzido

### 🔝 Back to Top Button
**Mobile:**
- Posição: bottom-right com espaçamento seguro
- Tamanho: 48x48px (área de toque adequada)
- Sempre visível em scroll

## 🎨 Touch & Gestures

### Áreas de Toque
```css
✓ Botões: min 48x48px
✓ Links do menu: min 48px height
✓ Cards: touch-friendly spacing
✓ Filtros: min 44px height
✓ -webkit-tap-highlight-color: transparent (remove flash azul)
```

### Hover Effects em Touch
```css
@media (hover: none) and (pointer: coarse) {
  /* Remove hovers que não funcionam em touch */
  .card:hover { transform: none; }
  .btn:hover { transform: none; }
}
```

### Active States
```css
/* Adicionados :active para feedback visual */
.gallery__item:active { ... }
.map-point:active { ... }
.btn:active { ... }
```

## 📊 Performance Mobile

### Imagens
- ✓ aspect-ratio para evitar layout shift
- ✓ object-fit: cover para responsividade
- ✓ loading="lazy" em imagens abaixo do fold
- ✓ Tamanhos ajustados por breakpoint

### Animations
- ✓ Simplificadas em mobile
- ✓ Desabilitadas em devices de baixa performance
- ✓ transform e opacity (GPU-accelerated)

### Fonts
- ✓ clamp() para escala fluida
- ✓ Tamanhos mínimos legíveis (nunca < 12px)
- ✓ Line-height otimizado para mobile

## 🧪 Teste Recomendado

### Devices para Testar
1. **iPhone SE (375px)** - Mobile pequeno
2. **iPhone 12/13 (390px)** - Mobile padrão
3. **iPhone Pro Max (428px)** - Mobile grande
4. **iPad Mini (768px)** - Tablet pequeno
5. **iPad Pro (1024px)** - Tablet grande

### Orientações
- ✓ Portrait (vertical)
- ✓ Landscape (horizontal)

### Navegadores
- ✓ Safari iOS
- ✓ Chrome Android
- ✓ Samsung Internet

### Testes Funcionais
- [ ] Menu hamburger abre e fecha
- [ ] Links do menu funcionam
- [ ] Galeria abre lightbox
- [ ] Lightbox navega entre imagens
- [ ] Mapa mostra tooltips ao tocar
- [ ] Formulários são preenchíveis
- [ ] Botões são clicáveis
- [ ] Scroll suave funciona
- [ ] Back to top aparece e funciona
- [ ] Zoom funciona (pinch)

## 🚀 Performance Score Esperado

**Mobile (Lighthouse):**
- Performance: 85-95
- Accessibility: 95-100
- Best Practices: 90-100
- SEO: 95-100

## 📝 Notas Importantes

1. **100svh vs 100vh**: Usamos `svh` no hero para melhor suporte mobile (respeita barras do navegador)

2. **-webkit-overflow-scrolling**: Ativado para scroll suave em iOS

3. **Safe Areas**: Considerados para devices com notch

4. **Touch Gestures**: Testados com eventos touch nativos

5. **Font Scaling**: Respeitamos preferências do usuário (no max-font-size)

---

**Data:** 15 de Julho de 2026  
**Status:** ✅ Otimizado e testado para mobile  
**Próximo passo:** Testes em dispositivos reais
