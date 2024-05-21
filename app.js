const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.get("/",function(req,res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=9ff261096a64385fd136b3cfb0518595&units=metric";
    https.get(url,function(response) {
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const weatherIcon=weatherData.weather[0].icon;
            const imgUrl="http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
            console.log(weatherData);
            console.log(weatherDescription);
            res.write("<h1>The temperature of "+query+" is "+temp+" degree Celcius</h1>");
            res.write("<h2>The weather is currently "+weatherDescription+"</h2>")
            res.write("<img src="+imgUrl+">");
            res.send();
        });
    });
});
app.listen(3000,function() {
    console.log("Server is running on port 3000");
});