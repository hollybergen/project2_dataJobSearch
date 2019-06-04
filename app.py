# from flask import Flask
from flask import Flask, jsonify, render_template
import pymongo
import json

app = Flask(__name__)

# setup mongodb connection
url = 'mongodb://localhost:27017'
client = pymongo.MongoClient(url)

# select database and collection
database = 'project2'
collection = 'geojson'
db1 = client[database][collection]

# load geojson to mongodb
# with open('geojson.json') as data:
#     json = json.load(data)
# db1.update_one({}, {'$set': json}, upsert=True)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/geojson_db")
def geojson_db():
    geojson = db1.find_one()
    geojson.pop('_id')
    client.close()
    return jsonify(geojson)

if __name__ == "__main__":
    app.run(host='localhost',port=5000,debug=True)