<div align="center">

# 🚀 project-starter-pack

**Шаблон Astro-проекта, где проверки и стиль кода уже настроены. Остаётся писать код.**

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://docs.astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node](https://img.shields.io/badge/Node-%E2%89%A522.23-5FA04E?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![ESLint](https://img.shields.io/badge/ESLint-flat_config-4B32C3?logo=eslint&logoColor=white)](eslint.config.js)
[![Prettier](https://img.shields.io/badge/code_style-Prettier-F7B93E?logo=prettier&logoColor=black)](.prettierrc.json)
[![Conventional Commits](https://img.shields.io/badge/commits-conventional-FE5196?logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/ru/v1.0.0/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[**⚡ Создать проект из шаблона**](https://github.com/nestreeLabs/project-starter-pack/generate)

</div>

---

## ✨ Что внутри

|     | Возможность         | Чем сделано                               |
| :-: | :------------------ | :---------------------------------------- |
| 🪐  | Фреймворк           | Astro 7                                   |
| 🛡️  | Проверка типов      | `astro check` + TypeScript strict         |
| 🔍  | Линтинг             | ESLint: JS, TypeScript, `.astro`          |
| 🎨  | Форматирование      | Prettier с плагином для `.astro`          |
| 🪝  | Проверки до коммита | husky + lint-staged                       |
| 📝  | История коммитов    | Conventional Commits, описание на русском |

## 🏁 Быстрый старт

```sh
npm install      # ставит зависимости и сразу включает git-хуки
npm run dev      # → http://localhost:4321
```

> [!TIP]
> Нужен Node.js `>= 22.23.4`. Проверить версию: `node -v`.

## 🧰 Команды

| Команда                | Что делает                      |
| :--------------------- | :------------------------------ |
| `npm run dev`          | Dev-сервер на `localhost:4321`  |
| `npm run build`        | Сборка в `./dist/`              |
| `npm run preview`      | Локальный просмотр сборки       |
| `npm run check`        | Проверка типов                  |
| `npm run lint`         | Проверка стиля кода ESLint      |
| `npm run format`       | Отформатировать весь проект     |
| `npm run format:check` | Только проверить форматирование |

## 🪝 Что происходит при `git commit`

```mermaid
flowchart LR
    A([git commit]) --> B{lint-staged}
    B -->|.js .ts .astro| C[eslint --fix]
    C --> D[prettier --write]
    B -->|остальные файлы| D
    D --> E{astro check}
    E -->|✅ 0 ошибок| F([коммит создан])
    E -->|❌ ошибки| G([коммит отменён])
    C -->|❌ ошибки| G
```

- Проверяются **только файлы из коммита**, поэтому хук работает быстро.
- Исправления ESLint и Prettier **автоматически попадают в тот же коммит**.
- `astro check` проверяет типы во всём проекте: ошибка в одном файле может сломать другой.

> [!NOTE]
> Конфиги: [eslint.config.js](eslint.config.js), [.prettierrc.json](.prettierrc.json), раздел `lint-staged` в [package.json](package.json), хук в [.husky/pre-commit](.husky/pre-commit).

## 🗂️ Структура

```text
📦 project-starter-pack
├── 🪝 .husky/             git-хуки
├── 🖼️ public/             статика без обработки
├── 📁 src/
│   └── 📄 pages/          каждый .astro / .md файл становится роутом
├── ⚙️ astro.config.mjs
├── 🔍 eslint.config.js
├── 🎨 .prettierrc.json
└── 📦 package.json
```

## 📝 Коммиты

Используется [Conventional Commits](https://www.conventionalcommits.org/ru/v1.0.0/): `type` и `scope` пишутся на английском, описание на русском в прошедшем времени.

```text
feat(pages): добавлена страница контактов
fix(docker): исправлена сборка образа
build: обновлены зависимости
```

<details>
<summary>Список типов</summary>

| Тип        | Когда использовать                  |
| :--------- | :---------------------------------- |
| `feat`     | новая функциональность              |
| `fix`      | исправление бага                    |
| `docs`     | документация                        |
| `style`    | только форматирование               |
| `refactor` | рефакторинг без изменения поведения |
| `perf`     | производительность                  |
| `test`     | тесты                               |
| `build`    | зависимости, сборка, Docker         |
| `ci`       | GitHub Actions                      |
| `chore`    | всё остальное                       |

</details>

## 🗺️ Roadmap

- [x] Astro + TypeScript strict
- [x] ESLint + Prettier
- [x] Pre-commit хук: lint-staged + `astro check`
- [ ] 🐳 Docker-образ на `@astrojs/node` (standalone)
- [x] ⚙️ CI на GitHub Actions: lint, format, check и build на каждый PR и push в `main`
- [ ] 🚢 Ручной деплой на VPS по SSH через GHCR, доступы хранятся в GitHub Secrets

## 📄 Лицензия

[MIT](LICENSE)
