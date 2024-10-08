# Recursively search the workflows folder at the PYTHONPATH and register all
# workflows in the folder.

import importlib
from pathlib import Path
import re
from __declare__.workflows.client import (
    Workflows,
)
import time


# Assuming all workflows follow a common pattern like FirstWorkflow class
WORKFLOWS_DIR = Path(__file__).parent.parent.parent / "workflows"


def register_workflows(worker):
    for path in WORKFLOWS_DIR.rglob("*.py"):
        ignore_matchers = [
            ".*__pycache__.*",
            ".*__init__.py",
            ".*.development.py",
        ]
        if any(
            [re.match(ignore_matcher, str(path)) for ignore_matcher in ignore_matchers]
        ):
            continue

        # Convert file path to module path, e.g., workflows.example.main
        module_path = (
            str(path.relative_to(WORKFLOWS_DIR.parent))
            .replace("/", ".")
            .replace("\\", ".")
            .replace(".py", "")
        )

        try:
            module = importlib.import_module(module_path)
            # Find the class that has a metaclass of WorkflowMeta
            class_name = None
            for attr_name in dir(module):
                attr = getattr(module, attr_name)
                if (
                    isinstance(attr, type)
                    and hasattr(attr, "__class__")
                    and attr.__class__.__name__ == "WorkflowMeta"
                ):
                    class_name = attr_name
                    break

            # Try to fetch the class from the module
            workflow_class = getattr(module, class_name, None)
            if workflow_class:
                worker.register_workflow(workflow_class())  # Register the workflow
            else:
                print(f"No matching workflow class found in {module_path}")
        except Exception as e:
            print(f"Error registering {class_name} workflow from {module_path}: {e}")


def main():
    worker = Workflows.worker("declare-worker")
    register_workflows(worker)
    worker.start()


if __name__ == "__main__":
    start_time = time.time()
    main()

