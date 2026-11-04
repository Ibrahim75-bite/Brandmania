# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues under `ibrahim75-bite/brandmania`, with offline/local specification fallbacks in `docs/specs/`. Use the `gh` CLI for remote operations.

## Conventions

- **Repository**: `ibrahim75-bite/brandmania`
- **Local Spec Fallback**: When operating offline or without GitHub CLI clearance, specifications live under `docs/specs/` (e.g. `docs/specs/<feature-slug>.md`).
- **Create an issue**: `gh issue create --repo ibrahim75-bite/brandmania --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --repo ibrahim75-bite/brandmania --json number,title,body,labels,comments`.
- **List issues**: `gh issue list --repo ibrahim75-bite/brandmania --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Sub-issues**: Link parent and sub-issues via `gh issue create --parent <parent>` or `Part of #<parent>` at the top of the body.
- **Blocking**: Link dependent tasks via `gh issue edit <child> --add-blocked-by <blocker>` or `Blocked by: #<blocker>` at the top of the body.
- **Comment**: `gh issue comment <number> --body "..."`.
- **Close**: `gh issue comment <number> --body "<resolution summary>"`, then `gh issue close <number>`.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## When a skill says "publish to the issue tracker"

Create a GitHub issue in `ibrahim75-bite/brandmania` (or write to `docs/specs/<feature-slug>.md` if offline).

## When a skill says "fetch the relevant ticket"

Read it via `gh issue view <number>` or read the corresponding file in `docs/specs/`.
