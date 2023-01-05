var express = require('express');
var ejs = require('ejs');
var port = 8082;
var app = express();
const Pool = require('pg').Pool
const bodyParser = require("body-parser");    
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
var helper = require('./helper');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'newpass',
  port: 5432,
})

pool.connect((err) => {
  if (err) throw err;
  console.log("Connected to postgreSQL");
});

let data = ''
let data1 = ''

app.get("/", (req, res) => {
  res.sendFile("./index.html", {
      root: __dirname,
  });
});

app.get("/test", (req, res) => {
  res.sendFile("./details.html", {
      root: __dirname,
  });
});


app.post('/set' , (req,res)=>{
  let url = `https://www.saferproducts.gov/RestWebServices/Recall?format=json&Retailer=${req.body.companyName}`
 fetch(url)
  .then(res => res.json())
  .then(json => {
    data = json
})
setTimeout(()=>{
  res.render("Main", {
    path: data,
    path1 : [{
      title:recallTitle,
      desc : recallDescription
    }]
  });
},6000)
})

app.post('/states', (req, res) => {
let addr = ''
if(req.body.compAddress){
  addr = req.body.compAddress
}
  let sql = `select * from csv2021`
  let sqlNew = ``
  if(req.body.companyName){
    sql = `select * from csv2021 where establishment_name ILIKE '%${req.body.companyName}' OR establishment_name ILIKE '%${req.body.companyName}%' OR establishment_name ILIKE '${req.body.companyName}%'`
  }
  if(req.body.compAddress){
    sqlNew = `select * from climate where propertyaddresszip = '${req.body.compAddress}'`
  }
  console.log('Estb Query',sql)
  console.log('Climate Query',sqlNew)
  pool.query(sql, (err, results) => {
      if (err) {
          throw err;
      } else {
        pool.query(sqlNew, (err, result) => {
          if (err) {
              throw err;
          } else {
            setTimeout(()=>{
              res.render("Index", {
                path: results.rows,
                path1 : result.rows,
            });
            },6000)
          }
      })
      }
  })
})


app.post('/draft', (req,res)=>{
  let addr = ''
  if(req.body.compAddress){
    addr = req.body.compAddress
  }   

    let sql = `SELECT csv2021.company_name , 
    csv2021.ein , 
    climate.propertyaddressfull, 
    csv2021.street_address , 
    csv2021.city , 
    csv2021.state  ,  
    csv2021.zip_code  ,  
    csv2021.industry_description  ,  
    csv2021.annual_average_employees  ,  
    csv2021.total_deaths  ,  
    csv2021.total_dafw_cases  ,  
    csv2021.total_djtr_cases  ,  
    csv2021.total_injuries  ,  
    csv2021.total_poisonings  ,  
    csv2021.total_respiratory_conditions  ,  
    csv2021.total_skin_disorders  ,  
    csv2021.total_hearing_loss  ,  
    climate.propertylatitude, 
    climate.propertylongitude, 
    climate.propertyaddressstreetname, 
    climate.heatriskscore, 
    climate.stormriskscore, 
    climate.wildfireriskscore, 
    climate.droughtriskscore, 
    climate.floodriskscore,
    climate.totalrisk
    FROM csv2021, climate
    WHERE (csv2021.establishment_name ILIKE '%${req.body.companyName}' OR csv2021.establishment_name ILIKE '%${req.body.companyName}%' OR csv2021.establishment_name ILIKE '${req.body.companyName}%') 
    AND (csv2021.street_address= '${req.body.compAddress}' AND climate.propertyaddressfull = '${req.body.compAddress}');`
    console.log('Query',sql)
    pool.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
          setTimeout(()=>{
            res.render("Details", {
              path: results.rows,
              helper:helper
            });
          })
          // res.json(results.rows)
        }
    })
})


app.post('/climate', (req, res) => {
  let addr = ''
  if(req.body.addressC){
    addr = req.body.addressC
  }     

  let sql = ``
    let asql
    if(req.body.zipCode && req.body.addressC === ''){
      sql = `select * from climate where propertyaddresszip = '${req.body.zipCode}'`
    } else if(req.body.addressC && req.body.zipCode === ''){
      sql = `select * from climate where propertyaddressfull ILIKE '${addr}%' OR propertyaddressfull ILIKE '%${addr}%' OR propertyaddressfull ILIKE '%${addr}';`
      asql = `select * from climate where to_tsvector(propertyaddressfull) @@ to_tsquery('${req.body.addressC}')`
    } else if(req.body.zipCode && req.body.addressC){
      sql = `select * from climate where propertyaddresszip = '${req.body.zipCode}' AND (propertyaddressfull ILIKE '${addr}%' OR propertyaddressfull ILIKE '%${addr}%' OR propertyaddressfull ILIKE '%${addr}');`
      asql = `select * from climate where to_tsvector(propertyaddressfull) @@ to_tsquery('${req.body.addressC}') and propertyaddresszip = '${req.body.zipCode}' AND (to_tsvector(propertyaddressfull) @@ to_tsquery('${req.body.addressC}'));`
    }
    console.log('Query',sql)
  
    pool.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
          setTimeout(()=>{
            res.json(results.rows)
            console.log('Length ',results.rows.length)
            // res.render("Draft", {
            //   path: results.rows,
            //   helper:helper
            // });
          })
        }
    })
  })

app.listen(port,()=>{
  console.log(`Listening at http://localhost:${port}/ `)
})