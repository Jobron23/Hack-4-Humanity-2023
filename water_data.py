import requests
import xmltodict

def get_county_code(county_name, filename):
    with open(filename) as f:
        for line in f:
            if line.strip().endswith(county_name):
                return line.split()[0][:2] + line.split()[1][:3]
    return None

county = "Snohomish County"
county_fips = get_county_code(county, "fips.txt")
print(county_fips)
url = f'https://waterservices.usgs.gov/nwis/iv/?format=json&countyCd={county_fips}&parameterCd=31730'
response = requests.get(url)
data = response.json()
print(data)
print([data[note][value]])
if len(data["value"]["timeSeries"]) >= 2:
    ph_values = [x["value"][0]["value"] for x in data["value"]["timeSeries"][1]["values"] if x["value"]]
    print(ph_values)
else:
    print("No data available for this county.")
