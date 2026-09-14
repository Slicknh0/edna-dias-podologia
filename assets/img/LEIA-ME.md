# Fotos — o que enviar e onde entra

As fotos da Edna não vieram anexadas e não foi possível puxá-las dos perfis públicos
(o Instagram entrega só a tela de login; o Facebook responde HTTP 400). A página foi
construída com **slots desenhados**: enquanto estão vazios, mostram uma placa verde com
o nome da foto esperada — nunca uma foto de banco fingindo ser a Edna.

## Como trocar um slot por uma foto real

Cada slot no `index.html` é uma `<figure class="photo ...">` com uma `<div class="photo__placeholder">` dentro.
Troque a `div` inteira por uma `img`:

```html
<!-- antes -->
<figure class="photo photo--portrait hero__photo">
  <div class="photo__placeholder"> ... </div>
</figure>

<!-- depois -->
<figure class="photo photo--portrait hero__photo">
  <img src="assets/img/edna-retrato.jpg"
       alt="Edna Dias, podóloga, no consultório da Vila Medeiros"
       width="1200" height="1500"
       fetchpriority="high" decoding="async">
</figure>
```

Nas fotos **abaixo da dobra** troque `fetchpriority="high"` por `loading="lazy"`.
O `width`/`height` reais evitam layout shift — mantenha-os.

## Arquivos esperados

| Arquivo | Proporção | Tamanho | Onde aparece | O que deve mostrar |
|---|---|---|---|---|
| `edna-retrato.jpg` | 4:5 | 1200×1500 | Hero (primeira dobra) | **A mais importante.** Edna de frente, olhando para a câmera, no consultório, luz boa, jaleco. É o rosto da marca. |
| `atendimento.jpg` | 4:3 | 1600×1200 | Seção pés diabéticos | Mãos trabalhando, instrumental, luvas. Foco no cuidado e na técnica — sem imagem gráfica de patologia. |
| `edna-sobre.jpg` | 4:5 | 1200×1500 | Seção "Sobre" | Edna em outro ângulo/momento, mais humano que o retrato do hero. |
| `consultorio-1.jpg` | 4:5 | 1200×1500 | Galeria (bloco alto) | Ambiente da sala, visão geral. |
| `consultorio-2.jpg` | 4:3 | 1600×1200 | Galeria (bloco largo) | Maca/cadeira de atendimento, o espaço em uso. |
| `consultorio-3.jpg` | 1:1 | 1200×1200 | Galeria | Instrumentos organizados, esterilização, detalhe de higiene. |
| `consultorio-4.jpg` | 1:1 | 1200×1200 | Galeria | Fachada ou recepção — ajuda quem está chegando a reconhecer o lugar. |
| `og-capa.jpg` | 1.91:1 | 1200×630 | Compartilhamento no WhatsApp/Facebook | Edna + nome do consultório. É a miniatura que aparece quando alguém manda o link. |
| `apple-touch-icon.png` | 1:1 | 180×180 | Ícone no iPhone | Fundo verde `#0b3b32` com a marca. |

`favicon.svg` já está pronto.

## Recomendações de captação

- **Celular serve.** Câmera de celular recente, na horizontal para as 4:3 e na vertical
  para as 4:5. O que mais importa é luz.
- **Luz natural**, de lado. Evite flash direto e luz de teto sozinha (faz sombra dura no rosto).
- **Fundo limpo.** A parede do consultório funciona melhor do que qualquer cenário montado.
- **Sem imagem de patologia** na landing page — unha infeccionada, ferida aberta e afins
  afastam quem está decidindo se marca. Isso é conteúdo de Instagram, não de home.
- **Nada de foto de banco com outra pessoa.** A página inteira se apoia na Edna ser real.

## Otimização antes de subir

O `ffmpeg` já está instalado nesta máquina:

```bash
# redimensionar e comprimir um JPG
ffmpeg -i original.jpg -vf "scale=1200:-1" -q:v 3 edna-retrato.jpg

# gerar a versão WebP (menor, para navegadores modernos)
ffmpeg -i edna-retrato.jpg -q:v 80 edna-retrato.webp
```

Para servir WebP com fallback, use `<picture>`:

```html
<picture>
  <source srcset="assets/img/edna-retrato.webp" type="image/webp">
  <img src="assets/img/edna-retrato.jpg" alt="..." width="1200" height="1500">
</picture>
```
