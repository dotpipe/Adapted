from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
import server_db

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this!
jwt = JWTManager(app)

# Consumer routes
@app.route('/api/consumer/ads', methods=['GET'])
def get_ads():
    zip_code = request.args.get('zipCode')
    ads = server_db.get_ads_for_location(zip_code)
    return jsonify(ads)

@app.route('/api/consumer/deals', methods=['GET'])
def get_deals():
    deals = server_db.fetch_deals()
    return jsonify(deals)

@app.route('/api/consumer/ticket/<ticket_hash>', methods=['GET'])
def get_ticket_info(ticket_hash):
    ticket_info = server_db.get_ticket_info(ticket_hash)
    return jsonify(ticket_info)

# Store routes
@app.route('/api/store/ticket/<ticket_hash>/complete', methods=['POST'])
@jwt_required()
def complete_pickup(ticket_hash):
    store_id = get_jwt_identity()
    server_db.complete_pickup(ticket_hash, store_id)
    return jsonify({"message": "Pickup completed successfully"}), 200

@app.route('/api/store/settings', methods=['GET', 'POST'])
@jwt_required()
def handle_store_settings():
    store_id = get_jwt_identity()
    if request.method == 'GET':
        settings = server_db.get_store_settings(store_id)
        return jsonify(settings)
    elif request.method == 'POST':
        updated_settings = request.json
        server_db.update_store_settings(store_id, updated_settings)
        return jsonify({"message": "Settings updated successfully"}), 200

@app.route('/api/store/analytics', methods=['GET'])
@jwt_required()
def get_store_analytics():
    store_id = get_jwt_identity()
    analytics = server_db.get_store_analytics(store_id)
    return jsonify(analytics)

# Franchise routes
@app.route('/api/franchise/franchises', methods=['GET'])
@jwt_required()
def get_brand_franchises():
    brand_id = get_jwt_identity()
    franchises = server_db.get_brand_franchises(brand_id)
    return jsonify(franchises)

@app.route('/api/franchise/performance', methods=['GET'])
@jwt_required()
def get_franchise_performance():
    brand_id = get_jwt_identity()
    performance = server_db.get_franchise_performance(brand_id)
    return jsonify(performance)

if __name__ == '__main__':
    app.run(debug=True)