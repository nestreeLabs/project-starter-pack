<div align="center">

# 🚀 project-starter-pack

**Шаблон Astro-проекта, где проверки, релизы и деплой на VPS уже настроены. Остаётся писать код.**

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://docs.astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node](https://img.shields.io/badge/Node-%E2%89%A522.23-5FA04E?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![ESLint](https://img.shields.io/badge/ESLint-flat_config-4B32C3?logo=eslint&logoColor=white)](eslint.config.js)
[![Prettier](https://img.shields.io/badge/code_style-Prettier-F7B93E?logo=prettier&logoColor=black)](.prettierrc.json)
[![Docker](https://img.shields.io/badge/Docker-GHCR-2496ED?logo=docker&logoColor=white)](Dockerfile)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?logo=githubactions&logoColor=white)](.github/workflows/ci.yml)
[![Conventional Commits](https://img.shields.io/badge/commits-conventional-FE5196?logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/ru/v1.0.0/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[**⚡ Создать проект из шаблона**](https://github.com/nestreeLabs/project-starter-pack/generate)

</div>

---

## ✨ Что внутри

|     | Возможность         | Чем сделано                                |
| :-: | :------------------ | :----------------------------------------- |
| 🪐  | Фреймворк           | Astro 7                                    |
| 🛡️  | Проверка типов      | `astro check` + TypeScript strict          |
| 🔍  | Линтинг             | ESLint: JS, TypeScript, `.astro`           |
| 🎨  | Форматирование      | Prettier с плагином для `.astro`           |
| 🪝  | Проверки до коммита | husky + lint-staged                        |
| 📝  | История коммитов    | Conventional Commits, описание на русском  |
| 🐳  | Контейнер           | Docker, `@astrojs/node` standalone         |
| ⚙️  | CI                  | GitHub Actions: lint, format, check, build |
| 🏷️  | Релизы              | версия и git-тег по коммитам               |
| 🚢  | Деплой              | вручную на VPS по SSH, образ из GHCR       |

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

Запустить в Docker локально: `docker compose up --build -d`, сайт откроется на `http://localhost` (порт меняется через `HOST_PORT=8080`). Проверка сервера: `/api/health` отвечает `ok`.

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
├── ⚙️ .github/workflows/  CI/CD: test → build → релиз, деплой
├── 🪝 .husky/             git-хуки
├── 🖼️ public/             статика без обработки
├── 📁 src/
│   └── 📄 pages/          каждый .astro / .md файл становится роутом
│       └── api/health.ts  проверка, что Node-сервер жив
├── 🐳 Dockerfile
├── 🐳 compose.yml         один файл для локального запуска и сервера
├── ☁️ cloud-init.yml      первичная настройка VPS
├── ⚙️ astro.config.mjs
├── 🔍 eslint.config.js
├── 🎨 .prettierrc.json
└── 📦 package.json
```

## 🚢 Релизы и деплой

```mermaid
flowchart LR
    PR([Pull Request]) --> T1[test] --> B1[build]
    M([push в main]) --> T[test] --> B[build]
    B -->|feat / fix в коммитах| R[образ в GHCR<br/>+ git-тег vX.Y.Z]
    B -->|только docs, ci, chore...| N([без релиза])
    W([Run workflow]) --> D[deploy на VPS]
    R -.-> D
```

**Версия** считается по коммитам с прошлого тега:

| В коммитах есть                        | Версия            |
| :------------------------------------- | :---------------- |
| `feat!:` или `BREAKING CHANGE:` в теле | `v1.2.3 → v2.0.0` |
| `feat:`                                | `v1.2.3 → v1.3.0` |
| `fix:`, `perf:`                        | `v1.2.3 → v1.2.4` |
| остальные типы                         | релиза нет        |

**Деплой** только вручную: **Actions → CI/CD → Run workflow**.

- `Use workflow from: main` выкатывает последнюю версию
- `Use workflow from → Tags → v1.2.0` выкатывает эту версию, так же делается откат

<details>
<summary>Первая настройка сервера</summary>

1. Создать deploy-ключ: `ssh-keygen -t ed25519 -f ~/.ssh/deploy_key -N "" -C deploy`
2. В [cloud-init.yml](cloud-init.yml) подставить содержимое `~/.ssh/deploy_key.pub` и вставить файл в поле Cloud-init при создании VPS. Он ставит Docker, создаёт пользователя `deploy`, папку `/opt/site` и открывает порты 22 и 80
3. В репозитории: **Settings → Environments → `production`**, добавить секреты:

| Secret            | Значение                                        |
| :---------------- | :---------------------------------------------- |
| `SSH_HOST`        | IP сервера                                      |
| `SSH_USER`        | `deploy`                                        |
| `SSH_PRIVATE_KEY` | содержимое `~/.ssh/deploy_key`                  |
| `SSH_KNOWN_HOSTS` | вывод `ssh-keyscan <IP>` (строки без `#`)       |
| `SSH_PORT`        | необязательно, по умолчанию `22`                |
| `APP_ENV`         | необязательно, переменные приложения для `.env` |

4. Сделать push с `feat` или `fix` и нажать Run workflow
5. Проверить `http://<IP>/api/health`, ответ `ok`

</details>

> [!NOTE]
> Серверный роут (не пререндеренный) включается строкой `export const prerender = false` в файле страницы, как в [src/pages/api/health.ts](src/pages/api/health.ts).

## 📝 Коммиты

Используется [Conventional Commits](https://www.conventionalcommits.org/ru/v1.0.0/): `type` и `scope` пишутся на английском, описание на русском в прошедшем времени. От типа коммита зависит [версия релиза](#-релизы-и-деплой).

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
- [x] 🐳 Docker-образ на `@astrojs/node` (standalone)
- [x] ⚙️ CI на GitHub Actions: lint, format, check и build на каждый PR и push в `main`
- [x] 🏷️ Автоматические версии и git-теги по Conventional Commits
- [x] 🚢 Ручной деплой на VPS по SSH через GHCR, доступы хранятся в GitHub Secrets
- [ ] 🔒 Домен и HTTPS (Caddy перед контейнером)
- [ ] 🗄️ База данных

## 📄 Лицензия

[MIT](LICENSE)
