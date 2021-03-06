import requests
import json
import datetime
import Globals
import random

def start_backtest(start, end, cash, code):

    Globals.startDay = parse_day(start)
    Globals.endDay = parse_day(end)
    Globals.currentDay = parse_day(start) # We cannot do = startDay because that would pass by ref
    Globals.equity = float(cash)
    
    cache_data()

    backtest_loop(code)

    ending_data = dict()
    ending_data["equities"] = Globals.equities
    ending_data["trades"] = Globals.trades

    return ending_data

def parse_day(date_str):
    return datetime.datetime( *( [int(i) for i in date_str.split("-")]) )

def get_sma(ticker, period):
    sum = get_price(ticker)
    tempDate = Globals.currentDay
    for i in range(period - 1):
        tempDate = prev_day(tempDate)
        sum += float(get_data(ticker, date_to_string(tempDate)))
    return (sum/period)

def cache_data():
    for ticker in Globals.available_stocks:
        URL = "https://api.iextrading.com/1.0/stock/{}/chart/1y".format(ticker)
        data = (requests.get(URL)).json()
        Globals.available_stocks[ticker] = data

def backtest_loop(code):

    while Globals.currentDay < Globals.endDay:

        if (get_price("AAPL") is not None) and (not isWeekend(Globals.currentDay)):
            # Exec the compiled python code
            exec(code)
            Globals.equities[date_to_string(Globals.currentDay)] = total_portfolio_value()
        next_day()

    return

def get_data(ticker, date, tag="close"):
    for i in Globals.available_stocks[ticker]:
        if(i.get("date") == date):
            return i.get(tag)
    return None

def date_to_string(date_time):
    return date_time.strftime('%Y-%m-%d')

def isWeekend(date_time):
    if((date_time.strftime('%A') == 'Saturday') or (date_time.strftime('%A') == 'Sunday')):
        return True
    else:
        return False

def next_day():
    Globals.currentDay += datetime.timedelta(days=1)
    while((Globals.currentDay.strftime('%A') == 'Saturday') or (Globals.currentDay.strftime('%A') == 'Sunday')):
        Globals.currentDay += datetime.timedelta(days=1)

def get_price(ticker):
    return get_data(ticker,date_to_string(Globals.currentDay), "close")

def get_volume(ticker):
    return get_data(ticker,date_to_string(Globals.currentDay),"volume")

def get_percent_change(ticker):
    return get_data(ticker,date_to_string(Globals.currentDay),"changePercent")

def get_vwap(ticker):
    return get_data(ticker,date_to_string(Globals.currentDay),"vwap")

def changeCash(amount):
    Globals.equity += amount
    return Globals.equity

def stock_quantity(stock):
    if stock in Globals.stocks:
        return Globals.stocks[stock]
    else:
        return 0;

def record_trade(ticker, quantity, buy = True):
    order_type = "Bought" if buy else "Sold"
    
    d = dict()
    d[date_to_string(Globals.currentDay)] = "{} {} {}".format(order_type, quantity, ticker)
    
    Globals.trades.append(d)

def buy(ticker, quantity):
    quantity = int(quantity)

    total_price = get_price(ticker)*quantity
    if(Globals.equity >= total_price):
        #add stock quantity to global stock dict
        if(stock_quantity(ticker) == 0):
            Globals.stocks[ticker] = quantity;
        else:
            Globals.stocks[ticker] = Globals.stocks[ticker] + quantity
        
        #remove money from equity
        changeCash(-1*total_price)
        record_trade(ticker, quantity, buy)
        return True
    else:
        return False

def sell(ticker, quantity):

    quantity = int(quantity)

    if(quantity <= stock_quantity(ticker)):
        total_price = quantity * get_price(ticker)
        changeCash(total_price)
        Globals.stocks[ticker] = Globals.stocks[ticker] - quantity
        record_trade(ticker, quantity, False)
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

def peek_next_day(date):
    temp = date + datetime.timedelta(days=1)
    while ((temp.strftime('%A') == 'Saturday') or (temp.strftime('%A') == 'Sunday')):
        temp += datetime.timedelta(days=1)
    return temp


