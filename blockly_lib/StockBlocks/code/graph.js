var SERVER_API = "http://localhost:8100";

function writeGraph(timestamps, equities){

    var borderColors = ["rgb(232, 75, 67)", "rgb(19, 107, 23)"];
    var bgColors = ["rgb(209, 16, 6)", "rgb(55, 173, 61)"];

    // 1 for Green, 0 for Red
    var border = borderColors[+(equities[equities.length-1] > equities[0])];
    var background = bgColors[+(equities[equities.length-1] > equities[0])];
    
    console.log(background);
    console.log(border);


    var ctx = document.getElementById('graph').getContext('2d');
    var chart = new Chart(ctx, {
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
            yAxes: [{
                ticks: {
                    min: 920000,
                    max: 1080000
                }
            }],
            
            xAxes: [{
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20
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


writeGraph([...Array(150).keys()], Array.from({length: 150}, () => (Math.random() * 50000 + 1000000)));

function startBacktest(){

    alert(document.getElementById("code").innerHTML);

    minAjax({
        url: SERVER_API,//request URL
        type: "GET",//Request type GET/POST
        //Send Data in form of GET/POST
        data:{
          start: document.getElementById("start").value,
          end: document.getElementById("end").value,
          cash: document.getElementById("cash").value,
          code: document.getElementById("code").innerHTML
        },
        //CALLBACK FUNCTION with RESPONSE as argument
        success: function(data){
          alert(data);
        }

    })

};
