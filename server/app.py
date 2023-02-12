from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import boto3
import creds
from decimal import Decimal


dynamodb = boto3.resource('dynamodb', region_name='eu-west-2',
                          aws_access_key_id=creds.aws_access_key_id, aws_secret_access_key=creds.aws_secret_access_key)
table = dynamodb.Table('eCommute')


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.get_json()
    mapped_value = data['mappedValue']
    selected_date = data['selectedDate']
    selected_distance = data['selectedDistance']
    selected_passengers = data['selectedPassengers']
    userId = data["userId"]

    # Make a request to the Climatiq API to calculate the CO2 emissions
    api_url = "https://beta3.api.climatiq.io/estimate"
    payload = {
        "emission_factor": {
            "activity_id": mapped_value,
            "source": "GHG Protocol",
            "region": "GLOBAL",
            "year": "2017",
            "lca_activity": "unknown"
        },
        "parameters": {
            "distance": selected_distance,
            "distance_unit": "km"
        }
    }
    headers = {

        "Authorization": f"Bearer {creds.api_key}",
        "Accept": "application/json"
    }
    response = requests.post(api_url, json=payload, headers=headers)


# Check the response headers
    # if response.headers.get('Content-Type') != 'application/json':
    #     co2_emissions = response.json()['co2e']
    #     return jsonify(error=f"The response from the Climatiq API is not a valid JSON string"), 400

    # # Check the response status code
    # if response.status_code != 200:
    #     return jsonify(error=f"The API call was not successful. Response status code: {response.status_code}"), response.status_code

    co2_emissions = Decimal(str(response.json()['co2e']))

    # Store the data (date, means of transport, distance, number of passengers, and CO2 emissions) in DynamoDB
    saved = table.put_item(
        Item={
            "userId": userId,
            'commuteDate': selected_date,
            'mode': mapped_value,
            'distance': selected_distance,
            'passengers': selected_passengers,
            'co2_emissions': co2_emissions
        }
    )
    print(saved)
    return {'commuteDate': selected_date,
            'co2_emissions': co2_emissions
            }


if __name__ == "__main__":
    app.run(debug=True)
