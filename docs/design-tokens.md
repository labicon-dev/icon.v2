# Design Tokens — ICON (M1)

> **Observação (importante):** o site do ICON foi desenhado primeiro no Figma e
> **ainda não existe um arquivo de _Guidelines_ oficial**. Estes tokens foram
> **extraídos por engenharia reversa dos frames já desenhados** do site
> ([icon-site-v2 no Figma](https://www.figma.com/design/XpI4SFzMPladCH4PolAUm8/icon-site-v2)),
> inspecionando as seções `inicio`, `sobre`, `interesse`, `quem`, `live`,
> `contato` e `footer`. Portanto, esta é a **base inicial** do design system —
> a consolidação formal (nomes semânticos definitivos, tema claro/escuro,
> variáveis publicadas no Figma) fica de **backlog para depois do M1**.
>
> Não havia _styles_ nem _variables_ publicados no arquivo (`styles: 0`); todos
> os valores abaixo vêm do uso real nos nós do frame.

O site é **single-page, tema escuro**, com estética técnica/wireframe: fundo
quase-preto, acento amarelo, títulos em **Space Grotesk** e rótulos/meta em
**JetBrains Mono**, cantos praticamente retos (raio 1–2px).

Fonte de verdade para código: [`src/styles/design-tokens.ts`](../src/styles/design-tokens.ts)
(objeto pronto para `theme.extend` do Tailwind). Este documento é a versão
legível + tabela de papéis semânticos.

---

## 1. Cores

### Marca e base

| Token        | Hex       | Uso                                                            |
| ------------ | --------- | -------------------------------------------------------------- |
| `accent`     | `#FCD100` | Acento da marca: heading "ARTE.", botões, faixa, seção Contato |
| `signal`     | `#FF0000` | Ponto de status "AO VIVO / LIVE"                               |
| `background` | `#040205` | Fundo da página                                                |
| `surface`    | `#070608` | Blocos/cards elevados sobre o fundo                            |

### Escala neutra (cinzas frios, leve tom violáceo)

| Token         | Hex       | Papel típico                          |
| ------------- | --------- | ------------------------------------- |
| `neutral.0`   | `#FFFFFF` | Branco puro                           |
| `neutral.50`  | `#FAFAFA` | **Texto primário** sobre fundo escuro |
| `neutral.100` | `#D9D9D9` | —                                     |
| `neutral.200` | `#CFCFD6` | Navegação / rótulos claros            |
| `neutral.300` | `#B4B4B4` | —                                     |
| `neutral.400` | `#AAAAB2` | —                                     |
| `neutral.500` | `#9A9AA2` | **Texto de corpo secundário**         |
| `neutral.600` | `#85858D` | —                                     |
| `neutral.650` | `#7C7C84` | Rótulos "/ ABOUT", "/ FIELDS"         |
| `neutral.700` | `#6F6F77` | Texto de apoio / tags                 |
| `neutral.750` | `#55555C` | Numeração discreta (01, 02, …)        |
| `neutral.800` | `#3A3A40` | Bordas suaves                         |
| `neutral.850` | `#1F1F1F` | Bordas / divisores                    |
| `neutral.900` | `#070608` | = `surface`                           |
| `neutral.950` | `#040205` | = `background`                        |

### Bordas e texto sobre amarelo

| Token             | Valor                 | Uso                                      |
| ----------------- | --------------------- | ---------------------------------------- |
| `border.DEFAULT`  | `#1F1F1F`             | Divisores padrão no escuro               |
| `border.muted`    | `#3A3A40`             | Divisores mais visíveis                  |
| `border.accent`   | `#FCD100`             | Contornos de destaque                    |
| `onAccent.strong` | `#040205`             | Texto sobre o bloco amarelo (Contato)    |
| `onAccent.muted`  | `rgba(4, 2, 5, 0.55)` | Rótulos secundários sobre amarelo        |
| `onAccent.subtle` | `rgba(4, 2, 5, 0.45)` | Placeholders de formulário sobre amarelo |

### Papéis semânticos (resumo)

- **Texto primário:** `neutral.50` (`#FAFAFA`)
- **Texto secundário:** `neutral.500` (`#9A9AA2`)
- **Texto de apoio/meta:** `neutral.700` (`#6F6F77`)
- **Destaque/acento:** `accent` (`#FCD100`)
- **Sobre amarelo:** `onAccent.strong` (`#040205`)

---

## 2. Tipografia

Duas famílias (ambas no Google Fonts):

- **`sans` → Space Grotesk** — display e corpo. Pesos: 400, 500, 700.
- **`mono` → JetBrains Mono** — rótulos, tags, meta e UI técnica. Pesos: 400, 500, 600, 700.

### Pesos

| Token      | Valor |
| ---------- | ----- |
| `regular`  | 400   |
| `medium`   | 500   |
| `semibold` | 600   |
| `bold`     | 700   |

### Escala tipográfica

`letter-spacing` convertido para `em` (valor Figma em px ÷ font-size).

| Token      | Tamanho | Line-height | Tracking | Família (uso)                                  |
| ---------- | ------- | ----------- | -------- | ---------------------------------------------- |
| `hero`     | 70px    | 70px        | −0.02em  | Space Grotesk 700 — "ONDE O CÓDIGO VIRA ARTE." |
| `display`  | 40px    | 40px        | +0.015em | Space Grotesk 700 — "ENTRE EM CONTATO"         |
| `h1`       | 36px    | 36px        | −0.05em  | Space Grotesk 700 — títulos de seção           |
| `h2`       | 32px    | 40px        | +0.07em  | Space Grotesk 700 — iniciais "NM"              |
| `h3`       | 24px    | 30px        | +0.2em   | Space Grotesk 700 — letra do tripé A/C/E       |
| `h4`       | 20px    | 28px        | −0.03em  | Space Grotesk 400 — subtítulo do "sobre"       |
| `h5`       | 16px    | 20px        | 0        | Space Grotesk 700 — títulos de card            |
| `body-lg`  | 14px    | 20px        | −0.04em  | Space Grotesk 400 — parágrafo do hero          |
| `body`     | 12px    | 21px        | −0.01em  | Space Grotesk 400/500 — parágrafos             |
| `body-sm`  | 11px    | 15px        | −0.03em  | Space Grotesk 400 — descrições de card         |
| `label`    | 10px    | 14px        | +0.06em  | JetBrains Mono — nav, botões, meta             |
| `label-sm` | 9px     | 12px        | +0.06em  | JetBrains Mono — meta menor                    |
| `caption`  | 8px     | 10px        | +0.16em  | Space Grotesk — "ART · SCIENCE · EDUCATION"    |
| `micro`    | 7px     | 9px         | 0        | JetBrains Mono — ornamentos (✦)                |

> Nota de escala: o design foi desenhado em um frame compacto de **1230px** de
> largura, com corpo de texto entre 10–12px. Ao implementar em largura desktop
> plena, avaliar se a escala deve subir proporcionalmente — decisão a
> consolidar junto com o design system formal (pós-M1).

---

## 3. Espaçamento

Design compacto, base ~2px. Gaps recorrentes entre elementos/seções, mais os
passos comuns extrapolados para completar a escala.

| Token | Valor | Observação                |
| ----- | ----- | ------------------------- |
| `px`  | 1px   |                           |
| `0.5` | 2px   | base                      |
| `1`   | 3px   | gap recorrente mais comum |
| `1.5` | 6px   | recorrente                |
| `2`   | 8px   | recorrente                |
| `2.5` | 10px  | recorrente                |
| `3`   | 12px  |                           |
| `4`   | 16px  | recorrente                |
| `5`   | 20px  |                           |
| `6`   | 24px  |                           |
| `8`   | 32px  |                           |
| `12`  | 48px  |                           |
| `16`  | 64px  |                           |

### Raio de borda

| Token     | Valor |
| --------- | ----- |
| `none`    | 0px   |
| `sm`      | 1px   |
| `DEFAULT` | 2px   |

---

## 4. Como usar (após ICO-50)

Depois que o Tailwind for adicionado (ICO-50), importe o objeto pronto:

```ts
// tailwind.config.ts
import { tailwindTheme } from './src/styles/design-tokens';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: tailwindTheme,
};
```

E carregue as fontes (ex.: `index.html` ou CSS):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

---

## 5. Tokens em JSON

Mesmos valores em JSON, para quem não usa o arquivo TS diretamente:

```json
{
  "colors": {
    "accent": "#FCD100",
    "signal": "#FF0000",
    "background": "#040205",
    "surface": "#070608",
    "neutral": {
      "0": "#FFFFFF",
      "50": "#FAFAFA",
      "100": "#D9D9D9",
      "200": "#CFCFD6",
      "300": "#B4B4B4",
      "400": "#AAAAB2",
      "500": "#9A9AA2",
      "600": "#85858D",
      "650": "#7C7C84",
      "700": "#6F6F77",
      "750": "#55555C",
      "800": "#3A3A40",
      "850": "#1F1F1F",
      "900": "#070608",
      "950": "#040205"
    },
    "border": { "DEFAULT": "#1F1F1F", "muted": "#3A3A40", "accent": "#FCD100" },
    "onAccent": {
      "strong": "#040205",
      "muted": "rgba(4, 2, 5, 0.55)",
      "subtle": "rgba(4, 2, 5, 0.45)"
    }
  },
  "fontFamily": {
    "sans": ["Space Grotesk", "system-ui", "sans-serif"],
    "mono": ["JetBrains Mono", "ui-monospace", "monospace"]
  },
  "fontWeight": { "regular": "400", "medium": "500", "semibold": "600", "bold": "700" },
  "fontSize": {
    "hero": ["70px", { "lineHeight": "70px", "letterSpacing": "-0.02em" }],
    "display": ["40px", { "lineHeight": "40px", "letterSpacing": "0.015em" }],
    "h1": ["36px", { "lineHeight": "36px", "letterSpacing": "-0.05em" }],
    "h2": ["32px", { "lineHeight": "40px", "letterSpacing": "0.07em" }],
    "h3": ["24px", { "lineHeight": "30px", "letterSpacing": "0.2em" }],
    "h4": ["20px", { "lineHeight": "28px", "letterSpacing": "-0.03em" }],
    "h5": ["16px", { "lineHeight": "20px", "letterSpacing": "0" }],
    "body-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "-0.04em" }],
    "body": ["12px", { "lineHeight": "21px", "letterSpacing": "-0.01em" }],
    "body-sm": ["11px", { "lineHeight": "15px", "letterSpacing": "-0.03em" }],
    "label": ["10px", { "lineHeight": "14px", "letterSpacing": "0.06em" }],
    "label-sm": ["9px", { "lineHeight": "12px", "letterSpacing": "0.06em" }],
    "caption": ["8px", { "lineHeight": "10px", "letterSpacing": "0.16em" }],
    "micro": ["7px", { "lineHeight": "9px", "letterSpacing": "0" }]
  },
  "spacing": {
    "px": "1px",
    "0.5": "2px",
    "1": "3px",
    "1.5": "6px",
    "2": "8px",
    "2.5": "10px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "12": "48px",
    "16": "64px"
  },
  "borderRadius": { "none": "0px", "sm": "1px", "DEFAULT": "2px" }
}
```
