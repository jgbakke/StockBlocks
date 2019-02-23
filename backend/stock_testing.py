import requests
import pprint
import json
import datetime
import Globals
import random

def get_data(ticker, date, tag="close"):
    URL = "https://api.iextrading.com/1.0/stock/{}/chart/1y".format(ticker)
    data = (requests.get(URL)).json()
    for i in data:
        if(i.get("date") == date):
            return i.get(tag)
    return "NOT FOUND"

def date_to_string(date_time):
    return date_time.strftime('%Y-%m-%d')

def isWeekend(date_time):
    print(date_time.strftime('%A'))
    if((date_time.strftime('%A') == 'Saturday') | (date_time.strftime('%A') == 'Sunday')):
        return True
    else:
        return False

def next_day():
    Globals.currentDay += datetime.timedelta(days=1)
    while((Globals.currentDay.strftime('%A') == 'Saturday') | (Globals.currentDay.strftime('%A') == 'Sunday')):
        Globals.currentDay += datetime.timedelta(days=1)

def get_price(ticker):
    return get_data(ticker,date_to_string(Globals.currentDay), "close")

def get_volume(ticker):
    return get_data(ticker,date_to_string(Globals.currentDay),"volume")

def get_changePercent(ticker):
    return get_data(ticker,date_to_string(Globals.currentDay),"changePercent")

def get_vwap(ticker):
    return get_data(ticker,date_to_string(Globals.currentDay),"vwap")

def changeCash(amount):
    Globals.equity += amount
    return Globals.equity

def stockQuantity(stock):
    if stock in Globals.stocks:
        return Globals.stocks[stock]
    else:
        return 0;


def buy(ticker, quantity):
    total_price = get_price(ticker)*quantity
    if(Globals.equity >= total_price):
        #add stock quantity to global stock dict
        if(stockQuantity(ticker) == 0):
            Globals.stocks[ticker] = quantity;
        else:
            Globals.stocks[ticker] = Globals.stocks[ticker] + quantity
        #remove money from equity
        changeCash(-1*total_price)
        return True
    else:
        return False

def sell(ticker, quantity):
    if(quantity <= stockQuantity(ticker)):
        total_price = quantity * get_price(ticker)
        changeCash(total_price)
        Globals.stocks[ticker] = Globals.stocks[ticker] - quantity
        return True
    else:
        return False

def total_portfolio_value():
    total = Globals.equity
    for i in Globals.stocks:
        total += get_price(i)*Globals.stocks[i]
    return total

def portfolio_cash():
    return Globals.equity



#Globals.currentDay = datetime.datetime(2018,6,25)
#print("Net worth: {}".format(total_portfolio_value()))
#print("Cash Left: {}".format(portfolio_cash()))
#buy("EA", 3)
#print(get_price("EA"))
#next_day()
#print(get_price("EA"))
#print("Net worth: {}".format(total_portfolio_value()))
#print("Cash Left: {}".format(portfolio_cash()))
#buy("AAPL", 4)
#sell("TSLA", 3)
#print(get_price("AAPL"))
#print("Net worth: {}".format(total_portfolio_value()))
#print("Cash Left: {}".format(portfolio_cash()))
#next_day()
#print(get_price("AAPL"))
#print("Net worth: {}".format(total_portfolio_value()))
#print("Cash Left: {}".format(portfolio_cash()))



#month = random.randint(1,12)
#day = random.randint(1,28)
#year = random.randint(1990,2019)
#print(date_to_string(datetime.datetime(year,month,day)))
#print(isWeekend(datetime.datetime(year,month,day)))
#print(get_data("MSFT", "20190222", "13:59","volume"))




