# Python Backend

This folder consist of the python backend for the GPT-like detection and GPT text completion using FastAPI.

## Getting Started

The following few sections describe the steps required to run the backend development server. If you just want to test out the application, refers to the instructions from the root `README.md` to start the FastAPI server using docker-compose.

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

### Create ONNX file
Create onnx file.
```
python -m transformers.onnx --model=gpt2 --feature=causal-lm onnx/
```

### Start the Development Server
Run the following commands to start the server in development mode.
```
uvicorn main:app --host 0.0.0.0 --port 8080
```

### Build and Start the Docker Container

To access the backend, you need to first build the Docker container using the following command
```
docker build -t robin-hood .
```

After the container is created, you can run the following commands to start the Docker container
```
docker run --rm --name robin-hood -p 8080:8080 --gpus all -it robin-hood
```
