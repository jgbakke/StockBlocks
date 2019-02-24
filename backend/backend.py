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
    
    print(start)
    print(end)
    print(cash)
    print(code)
    
    return jsonify(start_backtest(start, end, cash, code))

if __name__ == "__main__":
    app.run()
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r
