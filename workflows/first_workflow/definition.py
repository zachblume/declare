# Import hatchet from __declare__/Workflows/register.py
from __declare__.workflows.client import Workflows

@Workflows.workflow(on_events=["tutorial:create"], name="first-workflow")
class FirstWorkflow:

    @Workflows.step(name="first_step")
    def first_step(self, ctx):
        print("Congratulations! You've successfully triggered your first Python workflow run! 🎉")
        return {"result": "success!"}
    
    @Workflows.step(parents=["first_step"])
    def second_step(self, ctx):
        print("second step worked as well")
        return {"result": "success2"}
    

def main():
    worker = Workflows.worker("tutorial-worker")
    worker.register_workflow(FirstWorkflow())
    worker.start()


if __name__ == "__main__":
    main()