FROM python:latest

WORKDIR /auth

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8090

CMD python app.py