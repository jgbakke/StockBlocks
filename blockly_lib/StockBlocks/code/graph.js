var SERVER_API = "http://127.0.0.1:5000/backtest";
var chart = null;

function writeGraph(timestamps, equities){

    var borderColors = ["rgb(232, 75, 67)", "rgb(19, 107, 23)"];
    var bgColors = ["rgb(209, 16, 6)", "rgb(55, 173, 61)"];

    // 1 for Green, 0 for Red
    var border = borderColors[+(equities[equities.length-1] > equities[0])];
    var background = bgColors[+(equities[equities.length-1] > equities[0])];
    
    console.log(background);
    console.log(border);


    var ctx = document.getElementById('graph').getContext('2d');
    chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: timestamps,
        datasets: [{
            label: "Total Portfolio Value",
            backgroundColor: background,
            borderColor: border,
            borderWidth:1,
            lineTension:0,
            data: equities,
        }]
    },

    options: {
        scales: {
            
            xAxes: [{
                ticks: {
                    autoSkip: true
                }
            }]
        },
        
        elements : {
            point: {
                radius: 0
            }
        }
    }
    
    });
};


function hideGraph(){
    document.getElementById("menu").style.display = "block";
    document.getElementById("graph-container").style.display = "none";
    chart.destroy();
    chart.reset();
    chart = null;
}

function showData(data){
    var labels = [];
    var points = [];
    
    var data = JSON.parse(data);
    console.log(data);
    
    document.getElementById("menu").style.display = "none";
    document.getElementById("graph-container").style.display = "block";
    
    for(var date in data.equities){
        labels.push(date);
        points.push(data.equities[date]);
    }
    
    writeGraph(labels, points);
}

function startLive(){
    var cashAmount = document.getElementById("cash").value;

    if(confirm("Are you sure you want to go live? Your Capital One account will be billed $" + cashAmount + ".")){
    
            alert("Going Live!");
            startBacktest();
        
            minAjax({
                url: "http://api.reimaginebanking.com/accounts/5bc1e6e6322fa06b67793d92/transfers?key=991ca7f76e70b90f44fc6b59f8b0d1e8",
                type: "POST",
                data:{
                    "medium": "balance",
                    "payee_id": "5bc1e6e6322fa06b67793d92",
                    "transaction_date": "02-24-2019",
                    "status": "pending",
                    "description": "Transfering money into a Live Trading account",
                    "amount": cashAmount
                },
                success: function(data){
                  console.log("Capital One Response: ", data);
                  alert("Initial deposit received! Now just sit back and make some money!");
                }

            });
        
        
        
    }
}

function startBacktest(){

    if(!document.getElementById("code").innerHTML){
        alert("You must compile your code first");
        return;
    }

    minAjax({
        url: SERVER_API,//request URL
        type: "POST",//Request type GET/POST
        //Send Data in form of GET/POST
        data:{
          start: document.getElementById("start").value,
          end: document.getElementById("end").value,
          cash: document.getElementById("cash").value,
          code: document.getElementById("code").innerHTML
        },
        //CALLBACK FUNCTION with RESPONSE as argument
        success: function(data){
          showData(data);
        }

    })

};
