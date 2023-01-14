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

### Start the Development Server
Run the following commands to start the server in development mode.
```
uvicorn main:app --host 0.0.0.0 --port 8080
```

### Build and Start the Docker Container

WIP
