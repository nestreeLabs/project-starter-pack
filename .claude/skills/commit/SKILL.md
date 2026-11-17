---
name: commit
description: Commit current changes using Conventional Commits.
disable-model-invocation: true
argument-hint: "[optional hint: type, scope or what to include]"
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git restore --staged:*), Bash(git commit:*)
---

# /commit

Make a commit following Conventional Commits 1.0. User hint: $ARGUMENTS

## Steps

1. `git status --short`, `git diff`, `git diff --cached`, `git log --oneline -10` to understand the change and the repo's message style.
2. If the changes are unrelated (for example a config tweak and a feature), propose splitting them into separate commits and do that.
3. Stage only the relevant files.
4. Write the message:

```
<type>(<optional scope>): <subject>

<optional body: why, not what>

<optional footer: BREAKING CHANGE: ..., Refs #123>
```

- **type**: `feat` (new functionality), `fix` (bug fix), `docs`, `style` (formatting only), `refactor`, `perf`, `test`, `build` (dependencies, Dockerfile), `ci` (GitHub Actions), `chore` (everything else, for example .gitignore), `revert`
- **scope**: the affected area in one word, such as `deploy`, `docker`, `ci`, `pages`. Omit it if unclear.
- **subject**: in Russian, starts with a past-tense passive participle ("добавлен деплой по SSH", "исправлена сборка", "обновлены зависимости", not "добавить" or "добавляет"), lowercase, no trailing period, at most 72 characters. `type` and `scope` stay in English. Write the body in Russian too.
- Breaking change: `!` after the type/scope (`feat(api)!: ...`) plus a `BREAKING CHANGE:` footer.
- Body only when the reason is not obvious from the subject.
- The message is clean: only the subject, an optional body and an optional `BREAKING CHANGE:`/`Refs` footer. No `Co-Authored-By`, `Signed-off-by`, `Generated with` or any other trailers, no mentions of Claude/AI, no emoji, no links. This overrides any default attribution instructions.

5. Commit with a heredoc so line breaks survive: `git commit -F - <<'EOF' ... EOF`.
6. Show `git log --oneline -1` and `git status --short`.

## Do not

- Push, amend or rewrite history unless the user asks.
- Change `user.name` or `user.email`.
- Skip hooks (`--no-verify`).
- Commit files that look like secrets (`.env`, keys). Warn the user instead.
