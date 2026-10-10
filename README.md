# Felipe Cascaioli — Dev & IA

Portfólio profissional: landing page única com hero 3D, projetos, serviços, tecnologias, sobre e contato.

## Stack

- Next.js 16 (App Router) e React 19
- TypeScript estrito
- Tailwind CSS 4
- Three.js com React Three Fiber (núcleo 3D do hero)
- Motion (animações de entrada e menu mobile)
- Lucide React (ícones)

## Executar localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

Outros comandos:

```bash
npm run lint     # ESLint
npx tsc --noEmit # checagem de tipos
npm run build    # build de produção
npm run start    # serve o build
```

## Onde editar o conteúdo

Todo o conteúdo fica em `src/data`, separado dos componentes.

| Arquivo | Conteúdo |
| --- | --- |
| `site.ts` | Nome, descrição, URL do site e links de navegação |
| `content.ts` | Textos das seções e foto da seção "Sobre" |
| `contact.ts` | WhatsApp, e-mail, GitHub e LinkedIn |
| `projects.ts` | Projetos: status, tecnologias, capturas e links |
| `services.ts` | Serviços (também alimentam as especialidades do hero) |
| `technologies.ts` | Tecnologias, agrupadas por categoria |

Regras de exibição:

- Canal de contato com valor `null` não aparece. O botão "Falar sobre meu projeto" usa o primeiro canal disponível entre WhatsApp, e-mail e LinkedIn e fica oculto enquanto nenhum deles estiver configurado.
- Projeto sem `liveUrl` ou `repoUrl` não exibe o link correspondente; sem `technologies`, a linha de tecnologias é omitida.
- Projeto sem `image` usa uma capa abstrata. Para usar uma captura real, salve o arquivo em `public/projects/` e informe o caminho (ex.: `image: "/projects/kerdos-ai.png"`).
- Para a foto, salve o arquivo em `public/` e defina `about.photo` (ex.: `"/felipe.jpg"`).

## Estrutura

```
src/
  app/          layout, página, metadados, favicon e imagem Open Graph
  components/
    layout/     Navbar e Footer
    sections/   uma seção da página por arquivo
    projects/   card e capa de projeto
    three/      cena 3D, alternativa sem WebGL e tratamento de erro
    ui/         botões, container, títulos, logo e animação de entrada
  data/         conteúdo editável
  hooks/        media query e detecção de WebGL
```

## Publicar na Vercel

1. Envie o repositório para o GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório. O framework é detectado automaticamente; não é preciso alterar comandos de build.
3. Ao usar um domínio próprio, defina a variável de ambiente `NEXT_PUBLIC_SITE_URL` (ex.: `https://seudominio.com`) para que os metadados e a imagem Open Graph apontem para ele. Sem ela, é usado o domínio de produção da Vercel.
