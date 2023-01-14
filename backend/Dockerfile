FROM pytorch/pytorch:1.13.1-cuda11.6-cudnn8-runtime

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

RUN python -m transformers.onnx --model=gpt2 --feature=causal-lm onnx/

RUN python -m nltk.downloader punkt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
