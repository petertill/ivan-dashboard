var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
const FormData = require('form-data');

const axios = require("axios")
const process = require("process")

const {MongoClient} = require('mongodb');



app.use(bodyParser.text());


const uri = process.env.MONGO;
const client = new MongoClient(uri);

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/dashboard', function (req, res) {
  res.sendFile( __dirname + "/" + "generic.html" );
})
app.get('/elements', function (req, res) {
  res.sendFile( __dirname + "/" + "elements.html" );
})
app.get('/whats-new', function (req, res) {
  res.sendFile( __dirname + "/" + "release.html")
})
app.post('/', function (req, res) {
    const data = new FormData();
    console.log(req.body)
    data.append('client_id', process.env.CLIENT_ID);
    data.append('client_secret', process.env.CLIENT_SECRET);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', "https://dashh.petertill1.repl.co/dashboard");
    data.append('scope', 'identify');
    data.append('code', req.body);

    fetch('https://discordapp.com/api/oauth2/token', {
        method: 'POST',
        body: data,
    })
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            const config = {
                headers:{
                    "authorization":`Bearer ${data.access_token}`
                }
            }
            axios
                .get("https://discordapp.com/api/users/@me",config)
                .then(response=>{

                  var stored = (async () => await findDataEntry(parseInt(response.data.id)))();
                  console.log(stored)

                  stored.then(function(result){
                   console.log(result)
                    
                  
   // "Some User token"
                    //parties.then(function(paresult){
                      
                    

              
                    const obj = {username: response.data.username, discriminator: response.data.discriminator, avatar: response.data.avatar, id: response.data.id, rubels: result.smackers};
                    const string = JSON.stringify(obj);
                    console.log(response.data.username)
                    res.send(string)

})
                  
                })
                .catch(error=>{
                    console.log(error)
                })
        })
})
app.listen(8081)




//main().catch(console.error);


/*const {MongoClient} = require('mongodb');


async function main(){
    
    const uri = "";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        //await  listDatabases(client);

      var array = await findDataEntry(client, 707550269600169984)
      console.log(array.smackers)

     await createListing(client,
        {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        }
    ); 

      //await findOneListingByName(client, "Lovely Loft");

      //await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8 });
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}*/
/* async function main(){
  try {


                        //MONGO
const uri = "";
 

const client = new MongoClient(uri);
//Mongo end
                        // Connect to the MongoDB cluster
                        client.connect();
                      } catch (e) {
                        console.error(e);
                      } finally {
                        //client.close();
                      }
}
main().catch(console.error); */

async function findDataEntry(nameOfListing) {


  try {


                        //MONGO
const uri = process.env.MONGO;
 

const client = new MongoClient(uri);
//Mongo end
                        // Connect to the MongoDB cluster
                        client.connect();
                      } catch (e) {
                        console.error(e);
                      } finally {
                        //client.close();
                      }


  
    const result =  await client.db("coinsdb").collection("coinscollection").findOne({userid: nameOfListing});

    if (result) {
        console.log(`Found a listing in the collection with the id '${nameOfListing}':`);
      return result;
      //console.log(result.smackers)
    } else {
        console.log(`No listings found with the id '${nameOfListing}'`);
    }
}








async function findPartyEntry(nameOfListing) {


  try {


                        //MONGO
const uri = process.env.MONGO;
 

const client = new MongoClient(uri);
//Mongo end
                        // Connect to the MongoDB cluster
                        client.connect();
                      } catch (e) {
                        console.error(e);
                      } finally {
                        //client.close();
                      }


  
    const result =  await client.db("partydb").collection("partycollection").findOne({userid: nameOfListing});

    if (result) {
        console.log(`Found a listing in the collection with the id '${nameOfListing}':`);
      return result;
      //console.log(result.smackers)
    } else {
        console.log(`No listings found with the id '${nameOfListing}'`);
    }
}