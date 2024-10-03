from __declare__.workflows.client import Workflows

Workflows.event.push("user:create", {"test": "test"})
