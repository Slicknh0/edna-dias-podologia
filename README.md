# Edna Dias Podologia — landing page

Landing page estática de página única, em pt-BR, com um único objetivo de conversão:
**abrir uma conversa no WhatsApp**.

```
edna-dias-podologia/
├── index.html                  a página inteira
├── assets/
│   ├── css/styles.css          design system + todas as seções
│   ├── js/main.js              ~2 KB: header, barra fixa mobile, eventos
│   ├── fonts/                  Manrope variável, self-hosted (40 KB)
│   └── img/
│       ├── favicon.svg         pronto
│       └── LEIA-ME.md          o que enviar de foto e onde entra
├── PRODUCT.md                  fatos verificados + o que é proibido inventar
├── DESIGN.md                   o sistema visual construído
└── README.md
```

## Rodar

Abrir `index.html` com dois cliques já funciona.

Só há uma ressalva: por `file://` o navegador bloqueia as fontes por CORS e a página
cai na fonte de sistema. Para ver o resultado real, sirva por HTTP:

```bash
cd edna-dias-podologia
python -m http.server 8000
# http://localhost:8000
```

## Publicar

Não há build. Suba a pasta inteira em qualquer host estático — Vercel, Netlify,
Cloudflare Pages, GitHub Pages ou hospedagem compartilhada por FTP.

```bash
npx vercel --prod        # ou
npx netlify deploy --prod --dir .
```

## O que precisa ser feito antes de publicar

| # | O quê | Onde |
|---|---|---|
| 1 | **Enviar as fotos da Edna.** A página tem slots desenhados, hoje vazios. | `assets/img/LEIA-ME.md` explica cada arquivo |
| 2 | **Trocar o domínio.** `https://ednadiaspodologia.com.br/` é um placeholder no canonical, no Open Graph e no JSON-LD. | `index.html`, 5 ocorrências |
| 3 | **Confirmar o Instagram.** O briefing informou `@starrpespodologia` (dois R); a busca encontrou um Facebook em `starpespodologia` (um R). Não consegui verificar qual está certo — os dois perfis bloqueiam acesso automatizado. | `index.html`, 3 ocorrências |
| 4 | **Conferir a nota do Google.** 5,0 com 33 avaliações veio do briefing; o perfil bloqueia leitura automatizada. Se o número mudou, atualize. | `index.html`: meta do hero, título da seção de avaliações e JSON-LD |
| 5 | Gerar `og-capa.jpg` (1200×630) e `apple-touch-icon.png` (180×180). | `assets/img/` |
| 6 | **Decidir sobre "Consultório registrado em 2010".** Vem do registro do CNPJ (aberto em 16/09/2010) — é fato público, e a frase diz "registrado", não "10 anos de experiência". Se preferir tirar, é um item da trust bar. | `index.html`, trust bar |

## Analytics

Nenhum ID de GA4/GTM foi configurado — inventar um seria pior que não ter. A instrumentação
já está pronta: todo link de contato carrega um `data-track`, e `main.js` dispara para
`gtag()` e para `dataLayer` **se** existirem. Basta colar o snippet do GA4 ou GTM no
`<head>` e os eventos passam a fluir sem tocar em mais nada.

Eventos emitidos:

```
whatsapp_click_hero          whatsapp_click_sintomas       whatsapp_click_servicos
whatsapp_click_servicos_outros  whatsapp_click_diabetic    whatsapp_click_sobre
whatsapp_click_como_funciona whatsapp_click_localizacao    whatsapp_click_localizacao_cta
whatsapp_click_faq           whatsapp_click_faq_cta        whatsapp_click_final
whatsapp_click_floating      whatsapp_click_header         whatsapp_click_footer
phone_click                  maps_click                    instagram_click
```

## Trocar o número do WhatsApp

O número aparece 15 vezes, sempre o mesmo. Para trocar tudo de uma vez:

```bash
sed -i 's/5511997483482/NOVONUMERO/g' index.html
```

### As mensagens pré-preenchidas

Não é uma mensagem só. São cinco, e cada botão abre a que ele prometeu — um botão que diz
"Falar sobre o meu caso" não pode abrir "gostaria de saber os horários". Todas começam com
`Olá, vim pelo site da Edna Dias Podologia` para a voz ser uma só.

| Onde | O que a Edna recebe |
|---|---|
| Hero, header, barra fixa, CTA final, rodapé, passos, localização, FAQ, sobre | …e gostaria de saber os horários disponíveis para atendimento. |
| Lista de sintomas | …Gostaria de descrever o que estou sentindo nos pés e agendar uma avaliação. |
| Card de unha encravada | …Estou com problema de unha encravada e gostaria de agendar uma avaliação. |
| "Descreva o caso" nos serviços | …Gostaria de descrever o meu caso e saber se é atendido no consultório. |
| Seção de pés diabéticos | …Preciso de atendimento para pés diabéticos e gostaria de agendar uma avaliação. |

Se acrescentar um botão novo, dê a ele a mensagem que o texto do botão promete.

## Verificações já feitas

Auditado em Chrome headless a 360, 390, 430, 768, 1024, 1280 e 1440 px:

- zero overflow horizontal em todas as larguras
- zero erro de console
- zero falha de contraste abaixo de WCAG AA
- um único `h1`; hierarquia de headings correta
- todos os links de WhatsApp com mensagem pré-preenchida, apontando para o mesmo número
- todo link externo com `rel="noopener"`
- `MedicalBusiness` e `FAQPage` em JSON-LD, ambos válidos
- `prefers-reduced-motion` respeitado
- barra fixa mobile recua no fim da página e não cobre o rodapé
- detector de padrões do Impeccable: zero achados
- trust bar alinhada em 620 / 700 / 768 / 900 / 1000 / 1100 / 1280 / 1440 px
- sem CSS morto: toda classe removida do HTML saiu também do CSS

## Peso

Primeiro carregamento, ainda sem as fotos: **41 KB** com gzip ligado.

| Arquivo | Bruto | Gzip |
|---|---|---|
| `index.html` | 53,4 KB | 9,3 KB |
| `assets/css/styles.css` | 35,8 KB | 7,3 KB |
| `assets/js/main.js` | 3,0 KB | 1,3 KB |
| `manrope-latin.woff2` | 24,8 KB | já comprimido |

O HTML é grande em bruto porque os ícones são SVG inline e repetidos — mas comprime a
menos de um quinto justamente por serem repetidos, e em troca a página não faz nenhuma
requisição extra de ícone.

O `manrope-latin-ext.woff2` (15,1 KB) só baixa se a página encontrar um caractere fora do
latin básico, graças ao `unicode-range` — na prática, quase nunca.

Zero dependência externa, zero framework, zero build. O único recurso de terceiros é o
iframe do mapa, com `loading="lazy"` — ou seja, fora do caminho crítico.

Confirme que o gzip (ou brotli) está ligado no host. Vercel, Netlify e Cloudflare Pages
já fazem isso por padrão; hospedagem compartilhada nem sempre.
