from hatchet_sdk import Hatchet

from dotenv import load_dotenv
load_dotenv()

# re-export Hatchet as workflows
Workflows = Hatchet()