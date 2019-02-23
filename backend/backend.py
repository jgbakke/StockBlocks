from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/backtest", methods = ['GET', 'POST'])
def form_example():
    start = request.form.get("start")
    end = request.form.get("end")
    cash = request.form.get("cash")
    code = request.form.get("code")
    return "{} {} {} {}".format(start, end, cash, code)

if __name__ == "__main__":
    app.run()