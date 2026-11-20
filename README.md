# MentorX — Página VSL

Landing page de vendas em React + Vite, preparada para deploy na Vercel. Não utiliza Supabase nem backend.

## Estrutura

- `src/App.jsx`: página VSL, secções de venda, FAQ e desbloqueio do checkout.
- `src/styles.css`: identidade visual MentorX em preto, branco e cinzento.
- `src/config.js`: caminhos do vídeo, poster e URL do checkout.
- `public/videos/`: colocar aqui o vídeo principal.
- `public/images/`: colocar aqui imagens e posters.

## Adicionar o vídeo

Envia o vídeo em formato MP4 para:

`public/videos/vsl-mentorx.mp4`

Opcionalmente, adiciona uma imagem de capa em:

`public/images/vsl-poster.jpg`

## Configurar o checkout

Abre `src/config.js` e substitui o valor vazio de `CHECKOUT_URL` pelo link de checkout da Kursinha:

```js
export const CHECKOUT_URL = "https://teu-link-de-checkout";
```

O botão de checkout só é desbloqueado quando a reprodução atinge 90% da duração do vídeo. Depois de desbloqueado, permanece disponível durante a sessão.

## Executar localmente

```bash
npm install
npm run dev
```

## Deploy na Vercel

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Não são necessárias variáveis de ambiente nem ligação ao Supabase.
