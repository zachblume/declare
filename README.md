# Declare

Declare is an open-source framework for data engineering & analytics with framework-defined infrastructure built on Clickhouse. It aims to be everything you need to develop, preview, and ship pipelines and analytics faster.

## Values

-   **Declarative**: Describe data models, dashboards, and workflows declaratively, i.e. by describing your desired end state instead of intermediary plumbing or orchestration logic
-   **Hot reloading dev in miliseconds**: Instantly see changes to your models, dashboards, and workflows in your local environment
-   **[Framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure)**: Spend time writing business logic instead of setting up and managing cloud resources
-   **Convention over configuration**: Not hostile to extension and customization, but ackolwege 80% of data engineering work is currently repetitive solving of shared problems
-   **All-in on Clickhouse**: It's the inspiration and base of the stack.

## Features

-   [x] Hot reloading across the local full-stack environment - models, dashboards, and workflows
-   [ ] Instant branch environments on push for quicker collaboration and QA
-   [x] Declaratively defined SQL models
    -   [x] File-based router convention for easy discovery
    -   [x] Views in dev, configurable materialization in prod
    -   [ ] Co-located SQL tests
    -   [x] Pre-configured SQL syntax linting and formatting
    -   [ ] RBAC/permissions via posthook.sql files
-   [x] Declaratively defined dashboards, written in React with component library
-   [ ] Declarative ETL and other workflow management
    -   [ ] File-based router convention for easy discovery
    -   [ ] Managed in SQL (`select * from postgres_connection.schema.table`)
    -   [ ] Deployed as a regular Declare-managed workflow
        -   [ ] Can be triggered and subscribed to from like any other step
    -   [ ] Auto-subscribed to an event topic to allow easy triggering from workflows
-   [x] Auto-generated REST APIs for models
    -   [ ] JWT based authentication
-   [ ] Schedule dashboard delivery with embedded previews via Slack and email
-   [ ] Migrations management for recording stateful non-analytic changes like remediations
-   [ ] Dashboard for managing Clickhouse
-   [ ] CLI for linting, migrations, and deployment
-   [ ] Workflows, pipelines, and internal command line tools
    -   [x] Easy-to-write workflows in Python (backed by Hatchet)
    -   [ ] Exposing trigger API to materialize existing ETL configs and models
    -   [ ] All workflows are both deployed to cloud infra and triggerable via a local CLI
    -   [ ] Triggers
        -   [ ] Webhooks
        -   [ ] Cron
        -   [ ] SNS
-   [ ] Log sink
    -   [ ] S3
    -   [ ] Datadog

## File structure set up by create-declare-app

```
├── Makefile
├── README.md
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
    └── example
        ├── definition.py
        └── development.py
```

## Current progress / Get started

This repo at the moment is a PoC.

The goal is to provide a tool (`create-declare-app`) that will scaffold a new project with:

-   the file structure of this repo
-   and provide the Python and docker compose bindings
    -   which are currently stored under the `.declare folder`

Right now you can run:

```bash
make dev
```

And open http://localhost:5173/ecommerce/orders in your browser for an example.

## License

Will be AGPL or MIT - to be decided based on dependencies
