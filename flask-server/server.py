from flask import Flask
import requests

site = '01646500'
start_date='2022-02-18'
end_date= '2023-02-13'
app = Flask(__name__)

url = f'https://waterservices.usgs.gov/nwis/dv/?format=json&sites={site}&startDT={start_date}&endDT={end_date}&parameterCd=00400'

response = requests.get(url)
data = response.json()

ph_values = [x["value"][0]["value"] for x in data["value"]["timeSeries"][1]["values"] if x["value"]]

#Members API route

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3", ph_values]}

if __name__ == "__main__":
    app.run(debug=True)








