# Declare

The open-source data engineering framework for Clickhouse.

Focused on accelerating the develop, preview, ship workflow for analytics through (1) declarative everything-as-code, and (2) speed.

-   [x] All-in on Clickhouse as the base of the stack, on local and cloud
-   [x] Hot reloading across the local full-stack environment, measured in miliseconds
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
