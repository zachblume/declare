from __declare__.workflows.client import Workflows

@Workflows.workflow(on_events=["tutorial:create"], name="first-workflow")
class ExampleWorkflow:

    @Workflows.step(name="first_step")
    def first_step(self, ctx):
        print("Congratulations! You've successfully triggered your first Python workflow run! 🎉")
        return {"result": "success!"}
    
    @Workflows.step(parents=["first_step"])
    def second_step(self, ctx):
        print("second step worked as well")
        return {"result": "success2"}
        
# Test event:
# Workflows.event.push("user:create", {"test": "test"})