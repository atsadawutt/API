const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/kanye', async (req, res) => {
   try {
       const url = 'https://api.kanye.rest/'; // Replace with the URL you want to fetch data from
       const response = await axios.get(url);
       res.json(response.data); // Send the fetched data as a response
   } catch (error) {
       res.status(500).send('Error fetching data');
   }
});

app.get('/java', async (req, res) => {
   try {
       const url = 'https://v2.jokeapi.dev/joke/Any?contains=Java'; // Replace with the URL you want to fetch data from
       const response = await axios.get(url);
       res.json(response.data); // Send the fetched data as a response
   } catch (error) {
       res.status(500).send('Error fetching data');
   }
});

app.get("/", (req, res)=>{
   res.sendFile(__dirname + '/index.html');         // ใช้ __dirname เพื่อเป็น PATH ไปยังไฟล์ index.html ใน server
} );

app.post("/", (req,res)=>{
   //  console.log(req.body);
   //  console.log(req.body.num1);
   //  console.log(req.body.num2);
   //  res.send("Thank you for posting something");
   let num1 = Number(req.body.num1); // อ่านค่าจาก input1
   let num2 = Number(req.body.num2); // อ่านค่าจาก input2
   let result = num1 + num2; // รวมค่า
   res.send("The calculation result is : " + result); // แสดงผล
 });
 
app.get('/bmiCalculator', (req, res)=>{ //สำหรับแสดงหน้า bmiCalculator.html
   res.sendFile(__dirname + '/bmiCalculator.html'); 
}) 

app.post('/bmiCalculator', (req, res)=>{ //สำหรับส่งผลการคำนวณค่า BMI ออกมา
   let weight = Number(req.body.weight); // อ่านค่าจาก input1
   let height = Number(req.body.height); // อ่านค่าจาก input2
   // console.log(weight);
   // console.log(height);
   let BMI = Math.round (weight / (height**2));

   let description = ""
   if (BMI <= 18.5) description = "ผอมเกินไป"
   else if (BMI < 23) description = "น้ำหนักปกติ เหมาะสม"
   else if (BMI < 25) description = "น้ำหนักเกิน"
   else if (BMI < 30) description = "อ้วน"
   else description = "อ้วนมาก"

   res.send("คุณมีค่า BMI : " + BMI + ",  คุณอยู่ในเกณฑ์ : " + description); // แสดงผล
}) 

app.get('/my-json-api', (req, res) => {
    res.json('{"myJsonKey": "myJsonValue"}');
 });

app.listen(3000, ()=> {
   console.log ("Server is running on port 3000");
});

// คำสั่ง command line ต่อไปนี้: 
// cd API
// npm install express nodemon
// npm i -g nodemon
// node  calculator.js
// หรือใช้ nodemon calculator.js
// npx nodemon calculator.js
// sudo npm i -g nodemon (MacOS)
// กด ctrl + c เพื่อปิด server 
// npm i axios
