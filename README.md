# Declare

Declare is an open-source framework that gives you a dedicated Clickhouse data warehouse with everything you need to develop, preview, and ship analytics faster:

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
    -   [ ] Deployed to serverless functions, log sink
-   [x] Auto-generated REST APIs for models
    -   [ ] JWT based authentication
-   [ ] Schedule dashboard delivery with embedded previews via Slack and email
-   [ ] Migrations management for recording stateful non-analytic changes like remediations
-   [ ] Dashboard for managing Clickhouse
-   [ ] CLI for linting, migrations, and deployment
