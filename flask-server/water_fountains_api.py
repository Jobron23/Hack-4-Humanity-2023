import requests
import test
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/fountains")
def fountains():
# Define the bounding box for California
    lat1 = request.args.get("lat1", default = 0, type = float)
    lon1 = request.args.get("lon1", default = 0, type = float)
    lat2 = request.args.get("lat2", default = 0, type = float)
    lon2 = request.args.get("lon2", default = 0, type = float)

# Define the Overpass API request URL with the bounding box coordinates and the "amenity=drinking_water" filter
    url = f"https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=drinking_water]({lat1},{lon1},{lat2},{lon2});out;"

# Send the request to the Overpass API and retrieve the response
    response = requests.get(url)

# Check the status code of the response
    if response.status_code == 200:
    # The request was successful, so parse the JSON data from the response
        data = response.json()

    # Create a list to store the latitude and corresponding longitude of each water fountain
        fountains = []

    # Iterate over each element in the data
        for element in data["elements"]:
        # Extract the latitude and longitude of the element
            lat = element["lat"]
            lon = element["lon"]

        # Add the latitude and corresponding longitude to the list of fountains
            fountains.append((lat, lon))

    # Print the number of fountains found
        print(f"Found {len(fountains)} water fountains")

    # Print the latitude and corresponding longitude of each fountain
    #@app.route("/test")
        #def test():
        return jsonify(fountains)
        #for i, (lat, lon) in enumerate(fountains):
            #return render_template('test.html', fountains=fountains)
            #return(f"{i + 1}: ({lat}, {lon})")
    else:
    # There was an error with the request for water fountain locations, so print the error message
        print(f"Error: {response.text}")

if __name__ == "__main__":
    app.run(debug=True)
