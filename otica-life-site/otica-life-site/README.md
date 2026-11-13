# Ótica Life Bauru — site

Landing page da Ótica Life (Bauru-SP). Site estático: não precisa de build, a Vercel publica os arquivos como estão.

## Estrutura

```
index.html               Página principal
privacidade.html         Política de privacidade (abre em /privacidade)
vercel.json              Configuração da Vercel (URLs limpas, segurança, cache)
robots.txt               Instruções para o Google
sitemap.xml              Lista de páginas para o Google
site.webmanifest         Nome e ícones do site
favicon.ico              Ícone da aba do navegador
assets/
  css/site.css           Visual do site (Tailwind 3.4.17 já compilado)
  js/consentimento.js    Aviso de cookies + Google Analytics, Google Ads e Pixel da Meta
  icons/                 Ícones (celular, aba, atalho)
  img/                   Logo, foto do topo, foto da loja e imagem de compartilhamento
  img/vitrine/           29 modelos, cada um em 600 px e 1200 px (WebP)
```

## Passo a passo para publicar

### 1. GitHub (hoje)
1. Entre em github.com e clique em **New repository**. Nome: `otica-life-site`. Pode deixar **Private**. Clique em **Create repository**.
2. Na página do repositório, clique em **uploading an existing file**.
3. Abra a pasta `otica-life-site` do zip no seu computador, selecione **tudo o que está dentro dela** (não a pasta em si) e arraste para o GitHub.
4. Clique em **Commit changes**.

### 2. Vercel (hoje)
1. Entre em vercel.com com a conta do GitHub e clique em **Add New → Project**.
2. Escolha o repositório `otica-life-site` e clique em **Import**.
3. Em **Framework Preset**, deixe **Other**. Não preencha Build Command nem Output Directory.
4. Clique em **Deploy**. Em 1 minuto o site abre num endereço `....vercel.app`.
5. Teste esse endereço no celular: botões de WhatsApp das duas lojas, filtro da vitrine, aviso de cookies e `/privacidade`.

### 3. Domínio (amanhã)
1. Compre o domínio no Registro.br usando o CNPJ 33.731.623/0001-93.
2. Na Vercel: **Project → Settings → Domains → Add**. Adicione `seudominio.com.br` e também `www.seudominio.com.br`. Deixe um redirecionando para o outro (a Vercel sugere).
3. A Vercel mostra os valores de DNS. Copie-os.
4. No Registro.br: abra o domínio → **Configurar endereçamento** → **Modo avançado** → **Configurar zona DNS** → **Nova entrada**:
   - Tipo **A**, nome vazio, valor indicado pela Vercel (normalmente `76.76.21.21`).
   - Tipo **CNAME**, nome `www`, valor indicado pela Vercel (algo como `xxxx.vercel-dns-017.com`).
5. Salve e aguarde. Em geral leva de alguns minutos a poucas horas. O cadeado (https) é ativado sozinho.
6. Troque `www.oticalifebauru.com.br` pelo domínio real em `index.html`, `privacidade.html`, `robots.txt` e `sitemap.xml` (ou peça a versão pronta) e envie os arquivos de novo no GitHub. A Vercel publica sozinha a cada envio.

### 4. Depois que estiver no ar
- **Google Search Console:** adicione o domínio (verificação por TXT no Registro.br) e envie `https://seudominio.com.br/sitemap.xml`.
- **Perfil das lojas no Google:** coloque o link do site nas duas unidades.
- **Medição:** abra `assets/js/consentimento.js` e preencha no topo:
  - `ga4`: ID do Google Analytics (`G-...`)
  - `googleAds`: ID do Google Ads (`AW-...`)
  - `googleAdsConversao`: rótulo da conversão "Contato pelo WhatsApp"
  - `metaPixel`: ID do Pixel da Meta
  Nada disso carrega antes de a pessoa aceitar os cookies. Cada clique em botão de WhatsApp é contado como `generate_lead` (Google) e `Contact` (Meta).
- **Meta:** verifique o domínio no Gerenciador de Negócios.
- **Anúncios e Instagram:** use links com UTM, por exemplo `https://seudominio.com.br/?utm_source=instagram&utm_medium=bio`.

## Como adicionar um modelo na vitrine
1. Foto em 4:3, salva em duas larguras: `assets/img/vitrine/NOME-600.webp` (600x450) e `NOME-1200.webp` (1200x900). Use um nome descritivo, por exemplo `oculos-de-sol-marca-modelo`.
2. Em `index.html`, procure `const vitrine = [` e copie uma linha, trocando marca (`b`), nome (`n`), etiqueta (`c`), filtro (`f`: `grau`, `sol` ou `infantil`), `img` (o NOME, sem `-600.webp`) e descrição (`d`).
3. Se usar uma classe de estilo que ainda não existe no site, o `site.css` precisa ser gerado de novo.

## Dados das lojas
| | Centro | Jardim América |
|---|---|---|
| Endereço | R. Rio Branco, 8-28, CEP 17010-190 | Av. Nossa Sra. de Fátima, 9-85, CEP 17017-337 |
| WhatsApp | (14) 98832-7621 | (14) 98820-3639 |
| Coordenadas | -22.3228783, -49.0720352 | -22.3472265, -49.0597135 |
