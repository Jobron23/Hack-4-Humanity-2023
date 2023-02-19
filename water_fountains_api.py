import requests

# Define the bounding box for California
lat1 = 32.5343
lon1 = -124.4820
lat2 = 42.0095
lon2 = -114.1315

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
    for i, (lat, lon) in enumerate(fountains):
        print(f"Fountain {i + 1}: ({lat}, {lon})")
else:
    # There was an error with the request for water fountain locations, so print the error message
    print(f"Error: {response.text}")
