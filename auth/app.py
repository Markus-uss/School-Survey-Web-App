import connexion
from connexion import NoContent
from os.path import join, realpath

from sqlalchemy import false

bootleg_database = [
    {'username': 'Bob','password': '123'},
    {'username': 'Joe','password': '123'},
    ]

def validation(body):
    for account in bootleg_database:
        if account == body:
            return NoContent, 201
    return NoContent, 400

app = connexion.FlaskApp(__name__)
app.add_api(join(realpath("swagger"), 'openapi.yaml'),strict_validation=True, validate_responses=True)

if __name__ == "__main__":
    app.run(port=8090)