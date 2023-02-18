from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

site = '01646500'
start_date='2022-02-18'
end_date= '2023-02-13'


url = f'https://waterservices.usgs.gov/nwis/dv/?format=json&sites={site}&startDT={start_date}&endDT={end_date}&parameterCd=00400'

response = requests.get(url)
data = response.json()

ph_values = [x["value"][0]["value"] for x in data["value"]["timeSeries"][1]["values"] if x["value"]]

#Members API route

@app.route("/members")
def members():
    return {"members": ["Give me the goats name in JSON:", "Will Cockrum", "Oh also whats the PH levels of water in Columbus, Ohio:", ph_values]}
    #return "<div>Hello World</div>"

if __name__ == "__main__":
    app.run(debug=True)








