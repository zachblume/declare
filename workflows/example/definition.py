# from hatchet_sdk import Context
# from src.hatchet import hatchet


# @hatchet.workflow(
#     on_events=[
#         # Allow manual trigger:
#         "user:create"
#     ]
# )
# class WorkflowNameGoesHere:

#     @hatchet.step()
#     def step1(self, context: Context):
#         overrideValue = context.playground("prompt", "You are an AI assistant...")

#         print("executed step1", context.workflow_input())
#         return {
#             "step1": overrideValue,
#         }

#     @hatchet.step()
#     def step2(self, context: Context):
#         print("executed step2", context.workflow_input())
#         return {
#             "step2": "step2",
#         }

#     @hatchet.step()
#     def step3_fan_out_execute_100_things(self, context: Context):
#         print(
#             "executed step3",
#             context.workflow_input(),
#             context.step_output("step1"),
#             context.step_output("step2"),
#         )

#         results = []

#         for i in range(10):
#             results.append(
#                 (
#                     await context.aio.spawn_workflow(
#                         "FanOutStep", {"a": str(i)}, key=f"dont-repeat-me-key-{i}"
#                     )
#                 ).result()
#             )

#         result = await asyncio.gather(*results)

#         return {
#             "step3": result,
#         }

#     @hatchet.step()
#     def step4_fan_in(self, context: Context):
#         print(
#             "executed step4",
#             context.workflow_input(),
#             context.step_output("step1"),
#             context.step_output("step3"),
#         )
#         return {
#             "step4": "step4",
#         }


# @hatchet.workflow()
# class FanOutStep:
#     @hatchet.step()
#     async def process(self, context: Context):
#         a = context.workflow_input()["a"]
#         return {"status": "success " + a}
