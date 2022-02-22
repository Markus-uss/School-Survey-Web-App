from flask import render_template, Flask
from connexion import NoContent
import json
import mysql.connector
import pymongo

def create_app():
   app = Flask(__name__, template_folder='./views',static_folder='./static')
   return app

if __name__ == '__main__':
    app = create_app()

    @app.route('/compute', methods = ['GET'])
    def test():
        print("\n\nHi. ;-)\n\n")
        return NoContent, 201

    @app.route('/compute', methods = ['POST'])
    def authn():
        print(f"\n\nI have received a POST request.\n\n")
        mydb = mysql.connector.connect(
        host="mysql_db",
        user="joe",
        password="123",
        database="school"
        )

        mycursor = mydb.cursor()

        mycursor.execute("SELECT * FROM student_info")

        results = mycursor.fetchall()

        fav_subjects = dict()
        grades = dict()

        for result in results:
            try:
                fav_subjects[result[3]] += 1
                
            except:
                fav_subjects[result[3]] = 1
            try:
                grades[result[2]] += 1
            except:
                grades[result[2]] = 1
        
        print(grades)

        highest_count = max(fav_subjects, key=fav_subjects.get)
        lowest_count = min(fav_subjects, key=fav_subjects.get)
        highest_grade = max(grades, key=grades.get)
        lowest_grade = min(grades, key=grades.get)
        print(f"\n!!!Attempting to connect to MongoDB!!!\n")
        myclient = pymongo.MongoClient("mongodb://moe:123@mongo_db:27017/?authSource=admin")
        print(f"\n!!!Connected!!!\n")
        mydb = myclient["school_info"]
        mycol = mydb["computed_stats"]

        mydict = { "Most Favorite Subject": highest_count, "Least Favorite Subject": lowest_count, "Highest Grade Count": highest_grade, "Least Grade Count": lowest_grade }

        print(f"\n\n{mydict}\n\n")

        x = mycol.insert_one(mydict)

        return json.dumps({'success':True}), 201, {'ContentType':'application/json'} 

    app.run(debug='True',port='8110')