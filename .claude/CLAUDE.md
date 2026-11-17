# project-starter-pack

Шаблон Astro-проекта для `nestreeLabs/project-starter-pack`. Отсюда будут создаваться новые проекты, поэтому всё, что добавляется, должно быть универсальным и минимальным.

@../AGENTS.md

## Стек

- Astro 7, TypeScript strict (`astro/tsconfigs/strict`), Node `>= 22.23.4`, npm
- ESLint (flat config, `eslint.config.js`): `@eslint/js`, `typescript-eslint`, `eslint-plugin-astro`
- Prettier с `prettier-plugin-astro`, остальные настройки по умолчанию
- husky + lint-staged: pre-commit хук запускает `npx lint-staged`, затем `npm run check`
- Stylelint сознательно не используется. `.prettierignore` тоже удалён намеренно, не возвращать без запроса

## Команды

- `npm run check`: проверка типов (`astro check`)
- `npm run lint`: ESLint
- `npm run format`: Prettier `--write`
- `npm run format:check`: проверить форматирование

После изменений в коде прогоняй `npm run lint` и `npm run check`.

## Коммиты

- Делаются через `/commit` (`.claude/skills/commit/SKILL.md`)
- Conventional Commits: `type(scope)` на английском, описание на русском в прошедшем времени (`feat(pages): добавлена страница контактов`)
- Сообщение чистое: без `Co-Authored-By`, `Generated with` и других служебных строк, без упоминаний AI
- `.claude/` коммитится вместе с проектом
- Автор коммитов `nestreeLabs` (локальный git config репозитория), не менять
- Не пушить, не переписывать историю и не пропускать хуки (`--no-verify`) без явной просьбы

## План

Текущая задача: CI/CD через GitHub Actions, Docker и ручной деплой на VPS по SSH.

## Документация

`README.md` описывает только то, что реально есть в репозитории. Запланированное указывается в разделе Roadmap. Когда фича готова, обнови README.

## Архитектура и стиль кода

Так пишется весь код проекта, новые файлы следуют этим правилам.

### Структура `src/`

| Папка / файл                                          | Что лежит                                                         | Алиас           |
| ----------------------------------------------------- | ----------------------------------------------------------------- | --------------- |
| `pages/`                                              | роуты, только импорт страницы из `@views`: `<Home />`             | —               |
| `@views/<Page>/<Page>.astro`                          | полная страница: `meta` + `<Layout {meta}>` + секции              | `@views/*`      |
| `@sections/<Name>/<Name>.astro` + `style.module.scss` | секции страниц                                                    | `@sections/*`   |
| `@common/<Name>/<Name>.astro`                         | системные вещи, не UI (`SEO`, `Fonts`)                            | `@common/*`     |
| `@ui/<Name>/<Name>.astro`                             | базовые UI-элементы без логики (кнопка, инпут, бейдж)             | `@ui/*`         |
| `@components/<Name>/<Name>.astro`                     | составные компоненты, собираются из `@ui` (карточка, форма, меню) | `@components/*` |
| `layout/Layout.astro` + `common.css`                  | `html/head/body`, `<slot />`, глобальные стили и CSS-переменные   | `@layout/*`     |
| `@data/*.ts`                                          | статичные данные (списки, тексты)                                 | `@data/*`       |
| `@utils/*.ts`                                         | функции с логикой                                                 | `@utils/*`      |
| `types.ts`                                            | все типы проекта                                                  | `@types`        |

- Слои зависят только вниз: `@views` → `@sections` → `@components` → `@ui`. `@ui` не импортирует компоненты и секции
- Компонент живёт в папке со своим именем: `Hero/Hero.astro`, стили рядом в `style.module.scss`
- Импорты только через алиасы из `tsconfig.json`, без `../`. Новая папка в `src/` получает свой алиас

### `.astro` = только вёрстка

- В `.astro` только разметка и визуал. Во frontmatter допустимы импорты, `Astro.props` и вызов готовых функций
- Вычисления и бизнес-логика выносятся в `@utils/*.ts`: чистая функция, принимает аргументы, возвращает результат
- Обычные данные (массивы карточек, тексты) лежат в `@data/*.ts`, а не в компоненте
- Мета страницы задаётся объектом `const meta: ISEO = {...}` во view и передаётся как `<Layout {meta}>`

### Стили

- Глобальные стили и CSS-переменные только в `layout/common.css`
- Стили компонентов: SCSS-модули `style.module.scss`, `import styles from "./style.module.scss"`, `class={styles.name}`
- Без `<style>` внутри `.astro` и без inline-стилей. Цвета берутся из CSS-переменных

### Импорты

Импорты идут группами, между группами пустая строка, внутри группы без пустых строк:

1. Импорты значений: пакеты и алиасы (`astro:assets`, `@common/...`, `@data/...`)
2. Стили компонента (`import styles from "./style.module.scss"`)
3. Импорты типов (`import type { ... }`) всегда последней группой, отделены пустой строкой

Исключение: в `Layout.astro` глобальный `import "./common.css"` стоит самым первым, чтобы сброс и переменные шли в каскаде раньше стилей компонентов.

Эталон frontmatter (`src/layout/Layout.astro`). Пустая строка также отделяет `type Props` и код после импортов:

```astro
import "./common.css"; import SEO from "@common/SEO/SEO.astro"; import Fonts
from "@common/Fonts/Fonts.astro"; import type {ILayout} from "@types"; type
Props = ILayout; const {(meta, (lang = "ru"))} = Astro.props;
```

То же в `.ts`:

```ts
import { fontProviders } from "astro/config";

import type { AstroUserConfig } from "astro";
```

### Типы

- Все типы и интерфейсы в `src/types.ts`, импорт `import type { ... } from "@types"`
- Интерфейс: префикс `I` (`ISEO`, `ILayout`), type-алиас: префикс `T` (`TSEO`). Суффикс `Props` не используется
- Исключение: в `.astro` компоненте обязательна строка `type Props = IName;`, иначе Astro не проверяет пропсы
