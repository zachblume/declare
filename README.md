# Declare

Declare is an open-source framework for data engineering with framework-defined infrastructure built on Clickhouse. It aims to be everything you need to develop, preview, and ship data pipelines and analytics faster.

## Values

-   **All-in on Clickhouse**: It's the inspiration and base of the stack
-   **Declarative**: Describe data models, dashboards, and workflows declaratively, i.e. by describing your desired end state instead of intermediary plumbing or orchestration logic
-   **Hot reloading dev in miliseconds**: Instantly see changes to your models, dashboards, and workflows in your local environment
-   **[Framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure)**: Spend time writing business logic instead of configuring cloud resources
-   **Convention over configuration**: 80% of data engineering work is currently repetitive solving of shared problems
-   **Fully open-source**: Assembling a framework out of a stack of open-source production-ready tools
-   **Everything-as-code**: All logic lives in code and UIs are only for observability

## Features

-   [x] Full-stack hot reloading: models, dashboards, and workflows
-   [ ] Declaratively defined SQL models
    -   [x] File-based router like `models/dbname/tablename.sql` makes namespace reasoning easy
    -   [x] Views in dev, configurable materialization in prod
    -   [x] Pre-configured SQL syntax linting and formatting
    -   [ ] Co-located SQL tests
    -   [ ] RBAC/permissions via posthook.sql files
-   [ ] Declaratively defined React dashboards
    -   [x] File-based router convention for easy discovery
    -   [ ] Component library for charts and tables
    -   [ ] Scheduled delivery with embedded previews via Slack and email
-   [ ] Declarative ETL and other workflow management
    -   [ ] Managed in SQL (`select * from postgres_connection.schema.table`)
    -   [ ] Deployed as a regular Declare-managed python workflow
        -   [ ] Can be triggered from, and subscribed to by, other workflows -- the same as any other workflow
-   [x] Auto-generated REST APIs for models
    -   [x] Layer provides secure interace to Clickhouse
    -   [ ] JWT based authentication
-   [ ] Studio for managing Clickhouse and workflows
-   [ ] CLI for linting, stateful DB migrations, and deployment
-   [ ] Workflow engine
    -   [x] Easy-to-write Python SDK backed by [Hatchet](https://hatchet.run/)
    -   [ ] Build internal tools instead of CLIs: Declare CLI allows triggering workflows and tailing their output
    -   [ ] Trigger workflows from:
        -   [ ] Other workflows
        -   [ ] Webhook-compatible REST API
        -   [ ] Cron
-   [ ] Log sink all services
    -   [ ] Datadog
    -   [ ] S3

## File structure set up by create-declare-app

```bash
├── __declare__  # SDK binding mocks and docker config
├── Makefile
├── pyproject.toml
├── package.json
├── package-lock.json
├── connections
│   ├── egress
│   └── ingress
├── dashboards
│   └── orders.jsx
├── migrations
│   └── 20240930_new_user.sql
├── models
│   ├── ecommerce
│   │   ├── orders_moved_from_postgres
│   │   │   ├── definition.sql
│   │   │   ├── posthook.sql
│   │   │   └── seed.json
└── workflows
    └── example_workflow.py
```

## Current progress / Get started

This repo at the moment is a PoC.

The goal is to provide a tool (`create-declare-app`) that will scaffold a new project with:

-   the file structure of this repo
-   and provide the Python and docker compose bindings
    -   which are currently stored under the `declare folder`

Right now you can run:

```bash
make dev
```

And open http://localhost:5173/ecommerce/orders in your browser for an example.

## Open Source License

Declare's [LICENSE](LICENSE) is Apache 2.0
