import pandas as pd
from geopy.geocoders import Nominatim
from water_fountains_api import fountains

# read in the county data
county_data = pd.read_csv('us-county-b')

# create a geolocator object
geolocator = Nominatim(user_agent='my_application')

# define a function to get the county from a latitude and longitude
def get_county(lat, long):
    location = geolocator.reverse(f"{lat}, {long}")
    address = location.raw['address']
    county = address.get('county')
    return county

# iterate through the array of coordinates and get the county for each one
counties = []
for fountain in fountains:
    lat, long = fountain
    county = get_county(lat, long)
    counties.append(county)

# print out the counties for each coordinate
for i, county in enumerate(counties):
    print(f"Coordinate {i+1} is in {county}")
