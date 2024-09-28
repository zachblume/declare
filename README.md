# Declare

The open-source data engineering framework for Clickhouse focused on accelerating the develop, preview, ship workflow for analytics.

Two main goals: (1) declarative everything-as-code, and (2) very fast.

-   [x] All-in on Clickhouse as the base of the stack, on local and cloud
-   [x] Hot reloading across the local full-stack environment, measured in miliseconds
-   [ ] Instant branch environments on push for quicker collaboration and QA
-   [x] Declaratively defined SQL models
    -   [x] File-based router convention for easy discovery
    -   [x] Views in dev, configurable materialization in prod
-   [x] Declaratively defined dashboards, written in React with component library
-   [ ] Mange ETL configurations in SQL (`select * from postgres_connection.schema.table`)
-   [x] Auto-generated REST APIs for models
    -   [ ] JWT based authentication
-   [ ] Schedule dashboard delivery with embedded previews via Slack and email
