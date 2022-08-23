FROM python:3.9
WORKDIR /api
ENV PYTHONBUFFERED 1 

COPY requirements.txt /api/requirements.txt
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt