import requests
import json

def get_county_code(county_name, filename):
    with open(filename) as f:
        for line in f:
            if line.strip().endswith(county_name):
                return line.split()[0][:2] + line.split()[1][:3]
    return None

county = "Santa Clara County"
county_code = get_county_code(county, "fips.txt")
state_code = county_code[0:2]
start_date='2022-02-18'
end_date= '2023-02-17'

url = f'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&countyCd={county_code}&parameterCd=00400'
response = requests.get(url)

data = response.json()

try:
    ph_values = [x["value"][0]["value"] for x in data["value"]["timeSeries"][1]["values"] if x["value"]]
except:
    url = f'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&stateCd={state_code}&parameterCd=00400'
    response = requests.get(url)
    data = response.json()
    ph_values = [x["value"][0]["value"] for x in data["value"]["timeSeries"][1]["values"] if x["value"]]

url = f'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&countyCd={county_code}&parameterCd=63680'
response = requests.get(url)

data = response.json()

try:
    turbidity_values = [x["value"][0]["value"] for x in data["value"]["timeSeries"][1]["values"] if x["value"]]
except:
    url = f'https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&stateCd={state_code}&parameterCd=63680'
    response = requests.get(url)
    data = response.json()
    turbidity_values = [x["value"][0]["value"] for x in data["value"]["timeSeries"][1]["values"] if x["value"]]

x =  { "pH":ph_values, "turbidity": turbidity_values}
waterinfo = json.loads(json.dumps(x))

#70331 - total disolved solids
#00400 - pH
#63680- turbidity (cloudiness)
#00900- coliform and E. Coli
#00940 - chlorine