from airflow.decorators import dag, task
from datetime import datetime

@dag(schedule_interval=None, start_date=datetime(2023, 1, 1), catchup=False, tags=['example'])
def example_workflow():
    
    @task
    def first_step():
        print("Congratulations! You've successfully triggered your first Python workflow run! 🎉")
        return {"result": "success!"}
    
    @task
    def second_step(first_step_result):
        print(f"second step worked as well with result: {first_step_result}")
        return {"result": "success2"}
    
    first_result = first_step()
    second_step(first_result)

example_workflow_dag = example_workflow()