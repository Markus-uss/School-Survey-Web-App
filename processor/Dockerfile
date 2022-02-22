FROM python:latest

WORKDIR /processor

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8110

CMD python app.py