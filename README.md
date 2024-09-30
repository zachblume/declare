# Declare

Declare is an open-source framework for data engineering & analytics, built on Clickhouse, with everything you need to develop, preview, and ship analytics faster:

- [x] All-in on Clickhouse as the base of the stack
  - [ ] Hosted solution
- [x] Hot reloading across the local full-stack environment - models, dashboards, and workflows
- [ ] Instant branch environments on push for quicker collaboration and QA
- [x] Declaratively defined SQL models
  - [x] File-based router convention for easy discovery
  - [x] Views in dev, configurable materialization in prod
  - [ ] Co-located SQL tests
  - [x] Pre-configured SQL syntax linting and formatting
  - [ ] RBAC/permissions via posthook.sql files
- [x] Declaratively defined dashboards, written in React with component library
- [ ] Declarative ETL and other workflow management
  - [ ] File-based router convention for easy discovery
  - [ ] Managed in SQL (`select * from postgres_connection.schema.table`)
  - [ ] Deployed to serverless functions, log sink
- [x] Auto-generated REST APIs for models
  - [ ] JWT based authentication
- [ ] Schedule dashboard delivery with embedded previews via Slack and email
- [ ] Migrations management for recording stateful non-analytic changes like remediations
- [ ] Dashboard for managing Clickhouse
- [ ] CLI for linting, migrations, and deployment

## File structure set up by create-declare-app

```
├── Makefile
├── README.md
├── connections
│   ├── egress
│   └── ingress
├── dashboards
│   ├── orders.jsx
│   └── package.json
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

##
