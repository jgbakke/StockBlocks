from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
from stock_testing import start_backtest
import datetime
import os

app = Flask(__name__)
CORS(app)

@app.route("/backtest", methods = ['POST'])
@cross_origin()
def form_example():
    start = request.form.get("start")
    end = request.form.get("end")
    cash = request.form.get("cash")
    code = request.form.get("code")
    
    code = code.replace("&lt;", "<")
    code = code.replace("&gt;", ">")
    
    return jsonify(start_backtest(start, end, cash, code))

if __name__ == "__main__":
    app.run()
