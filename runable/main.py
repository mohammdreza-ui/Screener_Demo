from flask import Flask, send_from_directory
from flask_cors import CORS

App = Flask(__name__, template_folder = "Frontend", static_folder='Frontend', static_url_path="")
CORS(App)

@App.route('/favicon.ico')
def favicon():
    return send_from_directory('Frontend', 'favicon.ico', mimetype = 'image/vnd.microsoft.icon')

@App.route('/config.js')
def config():
    return send_from_directory('Frontend', 'config.js')

@App.errorhandler(404)
def not_found(e):
    return App.send_static_file('index.html')

if __name__ == "__main__":
        App.run(debug=True, host="0.0.0.0", port="8877")