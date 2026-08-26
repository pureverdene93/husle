# CLAUDE.md

## Төслийн тухай

Төрсөн өдрийн мэндчилгээний интерактив app. **Мобайл эхлээд.**

3 route: `/` (дугтуй) → `/mendchilgee` (захидал + Тийм/Үгүй) →
`/baalya` (лаа унтраах → төгсгөлийн цонх). Хуудас бүр **ганц** interaction-тэй.
Дараалал нь `src/lib/data.ts`-ийн `STEPS`-ээс тодорхойлогдоно — progress dots
болон "Цааш" товч тэндээс тооцоологддог.

Ганц удаагийн хувийн төсөл — over-engineering хэрэггүй. Хийж буй зүйл нь
шаардлагаа хангаж байвал болно, ирээдүйн өргөтгөлд зориулж abstraction бүү үүсгэ.

Next.js app нь `demo/` дэд хавтаст (тусдаа git repo). **Бүх командыг `demo/`-оос ажиллуул.**

## Stack

- **Next.js 16** — App Router, RSC, React Compiler (`reactCompiler: true` in `next.config.ts`)
- **React 19**
- **TypeScript 5** — `strict: true`, `noEmit` (билдийг Next хийнэ)
- **Tailwind CSS v4** — PostCSS-ээр (`@tailwindcss/postcss`). **`tailwind.config.js` БАЙХГҮЙ** —
  бүх тохиргоо `src/app/globals.css`-ийн `@theme` дотор
- **shadcn/ui** — `components.json`-оор удирдана (style `base-rhea`, base color `neutral`,
  CSS variables, `@base-ui/react` дээр суурилсан)
- **lucide-react** icons, **tw-animate-css**
- **ESLint 9** flat config (`eslint.config.mjs`)
- **framer-motion** — бүх animation, хуудас хоорондын шилжилт
- **canvas-confetti** — `src/lib/confetti.ts`-ээс lazy import хийж дуудна

Суусан ч одоогоор ашиглагдаагүй: `react-hook-form`, `zod`, `cmdk`,
`embla-carousel-react`, `next-themes`, `sonner`.

> Шинэ dependency суулгах шаардлага гарвал эхлээд надаас асуу
> (доорх "Хийж болохгүй" хэсэг).

## Командууд

`demo/`-оос ажиллуулна:

| Команд | Юу хийдэг |
| --- | --- |
| `npm run shaa` | dev server (**dev script-ийн нэр `shaa`, `dev` БИШ**) |
| `npm run build` | production build |
| `npm run start` | production build-ийг serve хийх |
| `npm run lint` | ESLint |

Тест байхгүй.

## Бүтэц

```
demo/
  src/
    app/                    # App Router: layout.tsx, page.tsx, globals.css
    components/
      ui/                   # shadcn CLI-ийн эзэмшил — ГАРААР БҮҮ ЗАС
      common/               # page-shell, progress dots, "Цааш" товч, дуу
      features/<хуудас>/    # тухайн хуудасны interaction
    lib/
      data.ts               # БҮХ агуулга + STEPS дараалал, type-тай
      utils.ts              # зөвхөн cn() болон жижиг helper
      confetti.ts           # canvas-confetti-г lazy import хийнэ
  components.json
  public/photos/            # husle*.jpg, зам нь data.ts-д заасан
```

Агуулгын өөрчлөлт бүр `src/lib/data.ts`-д л орно — компонент дотор текст
шууд бүү бич.

Дизайн: дулаан pastel (цөцгий дэвсгэр + terracotta accent), light-only —
dark mode **зориудаар** байхгүй, `globals.css`-ийн `@custom-variant dark`
мөрийг л шадcn-ы `dark:` класс OS тохиргооноос асахгүй байлгах үүрэгтэй.

## Конвенц

- Import-д `@/*` alias ашигла (`src/*` руу заана) — харьцангуй `../../` зам БИШ
- Файлын нэр kebab-case: `wish-form.tsx`
- Компонентын нэр PascalCase, **named export**
- Default нь Server Component. `'use client'`-ийг зөвхөн state / effect / event handler
  хэрэгтэй **хамгийн доод түвшний** компонент дээр тавь
- Класс нэгтгэхдээ `@/lib/utils`-ийн `cn()` ашигла — Tailwind conflict зөв merge болно
- Tailwind v4: design token-уудыг `globals.css`-д CSS variable болгож тодорхойл
- **Инлайн hex өнгө бүү бич** — Tailwind token эсвэл CSS variable ашигла
- Props-ыг тодорхой type-л, `any` бүү ашигла
- Бүх UI текст монголоор. Кодын коммент, хувьсагчийн нэр англиар

## Хийж болохгүй

- `src/components/ui/` доторх файлыг гараар засах. Компонент дутвал
  `npx shadcn@latest add <name>` ажиллуул, өөрөө бүү бич.
  Заавал засах шаардлага гарвал надаас асуу
- Компонент дотор шууд fetch хийх — `src/lib/`-д функц болгож гарга
- `any` type
- `tailwind.config.js` үүсгэх
- Шинэ dependency нэмэх — эхлээд надаас асуу

## Шалгах

Өөрчлөлт хийсний дараа `npm run build` ажиллуулж **0 алдаа** эсэхийг батал.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
