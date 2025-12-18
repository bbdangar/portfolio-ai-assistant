import os
from ibm_watsonx_ai.foundation_models import ModelInference
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams
from dotenv import load_dotenv
from langchain_ibm import WatsonxLLM
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.pydantic_v1 import BaseModel

load_dotenv()

model_id = 'meta-llama/llama-4-maverick-17b-128e-instruct-fp8'

parameters = {
    GenParams.MAX_NEW_TOKENS: 256,
    GenParams.TEMPERATURE: 0.2,
}

credentials = {
    "url": os.getenv("WATSONX_URL"),
    "apikey": os.getenv("WATSONX_APIKEY"),
}

project_id = os.getenv("WATSONX_PROJECT_ID")

model = ModelInference(
    model_id=model_id,
    params=parameters,
    credentials=credentials,
    project_id=project_id
)

watson_llm = WatsonxLLM(watsonx_model = model)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant"),
    MessagesPlaceholder("msgs")
])
input_ = { "msgs": [HumanMessage(content="What is the day after Tuesday?")]}

chain = prompt | watson_llm

response = chain.invoke(input=input_)

print(response)


# msg = watson_llm.invoke(
#     [
#         SystemMessage(content="You are a supportive AI bot that suggests fitness activities to a user in one short sentence"),
#         HumanMessage(content="I like high-intensity workouts, what should I do?"),
#         AIMessage(content="You should try a CrossFit class"),
#         HumanMessage(content="How often should I attend?")
#     ]
# )

# print(msg)