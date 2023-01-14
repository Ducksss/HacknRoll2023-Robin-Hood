# Python Backend

This folder consist of the python backend for the GPT-like detection and GPT text completion using FastAPI.

## Getting Started

### Install Dependencies
Run the following commands to install dependencies.
```
python -m venv venv

source venv/bin/activate

pip install -U pip

pip install -r requirements.txt
```

### Update Your Own API Key
Catch me if you can make use of OpenAI's API to access GPT-3. To access OpenAI's API, you need to export your own api key as environment variable. You can inject the environment variable using the following steps:

1. Create an OpenAI account and create your own API key by following [this tutorial](https://elephas.app/blog/how-to-create-openai-api-keys-cl5c4f21d281431po7k8fgyol0).
2. Create a `.env` file using `.env.example` and update your API key.
    ```bash
    cp .env.example .env
    ```


### Start the Development Server
Run the following commands to start the server in development mode.
```
uvicorn main:app --host 0.0.0.0 --port 8080
```

### Build and Start the Docker Container

WIP
