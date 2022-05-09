const express = require("express");
const mysql = require('mysql');
const app = express();
const pool = dbConnection();
const fetch = require('node-fetch')

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


const key = process.env['key']
var guid;

app.get('/', async (req, res) => {
    //  let key=;
    //  let offset =10;
    //  // let data;
    //  let url = `https://www.giantbomb.com/api/genres/?api_key=${key}&format=JSON&offset=${offset}&sort=id:asc`;
    //  // data = await fetchData(url);
    //  // console.log(data.results[0]);
    // console.log(url);

	 // 	loadFranchiseDatabase();
		// loadGameDatabase();
		// loadCompanyDatabase();
		// loadPeopleDatabase();
	
   res.render('home');
});
app.get('/cSearch',(req,res)=>{
    res.render('cSearch')
})
app.get('/gSearch',(req,res)=>{
    res.render('gSearch')
})
app.get('/compSearch',(req,res)=>{
    res.render('compSearch')
})
app.get('/fSearch',(req,res)=>{
    res.render('fSearch')
})

app.get('/cResults', async (req, res) => {
    let character = req.query.userKeyword;
    let characterLink = character.split(" ").join("%20");
    let offset =10;
    let url = `https://www.giantbomb.com/api/search/?api_key=${key}&format=JSON&query=${characterLink}&resources=character&field_list=name,image,guid&limit=100`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    
    let imageArr = [];
    let nameArr = [];
    let charNum = data.results.length;
    let charId=[];
    
    for(let i = 0; i < data.results.length;i++){
        imageArr[i] = data.results[i].image.medium_url;
        nameArr[i] = data.results[i].name;
        charId[i] = data.results[i].guid;
        console.log(data.results[i].guid)
    }

    res.render('cResults',{"nameList":nameArr,"imageNameList":imageArr,"charNum":charNum,"charId":charId})
});

app.get('/gResults', async (req, res) => {
    let game = req.query.userKeyword;
    let gameLink = game.split(" ").join("%20");
    let offset =10;
   
    let url = `https://www.giantbomb.com/api/search/?api_key=${key}&format=JSON&query=${gameLink}&resources=game&field_list=name,image,guid&limit=100`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.results[0]);
    
    let imageArr = [];
    let nameArr = [];
    let gameNum = data.results.length;
    let gameId=[];
    for(let i = 0; i < data.results.length;i++){
        imageArr[i] = data.results[i].image.medium_url;
        nameArr[i] = data.results[i].name;
        gameId[i]= data.results[i].guid;
        console.log(data.results[i].guid)
    }
   
    
    res.render('gResults',{"nameList":nameArr,"imageNameList":imageArr,"gameNum":gameNum,"gameId":gameId})
});


app.get('/compResults', async (req, res) => {
    let company = req.query.userKeyword;
    let companyLink = company.split(" ").join("%20");
     let offset =10;
   
     let url = `https://www.giantbomb.com/api/search/?api_key=${key}&format=JSON&query=${company}&resources=company&field_list=name,image,guid&limit=100`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    
    let imageArr = [];
    let nameArr = [];
    let compNum = data.results.length;
    let compId=[]
    for(let i = 0; i < data.results.length;i++){
        imageArr[i] = data.results[i].image.medium_url;
        nameArr[i] = data.results[i].name;
        compId[i] = data.results[i].guid;
        console.log(data.results[i].guid)
    }

    res.render('compResults',{"nameList":nameArr,"imageNameList":imageArr,"compNum":compNum,"compId":compId})
});

app.get('/fResults', async (req, res) => {
    let franchise = req.query.userKeyword;
    let franchiseLink = franchise.split(" ").join("%20");
     let offset =10;
   
     let url = `https://www.giantbomb.com/api/search/?api_key=${key}&format=JSON&query=${franchise}&resources=franchise&field_list=name,image,guid&limit=100`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    
    let imageArr = [];
    let nameArr = [];
    let franNum = data.results.length;
    let franId=[]
    for(let i = 0; i < data.results.length;i++){
        imageArr[i] = data.results[i].image.medium_url;
        nameArr[i] = data.results[i].name;
        franId[i] = data.results[i].guid;
        console.log(data.results[i].guid)
    }

    res.render('fResults',{"nameList":nameArr,"imageNameList":imageArr,"franNum":franNum,"franId":franId})
});

app.get("/character", async function(req, res){
    guid = req.query.characters
    console.log(guid)
    let url =`https://www.giantbomb.com/api/character/${guid}/?api_key=${key}&format=JSON`
    // console.log(guid)
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();

    console.log(data.results.description);
    res.render('character',{"data":data});
});

app.get("/franchise", async function(req, res){
    guid = req.query.franchise
    console.log(guid)
    let url =`https://www.giantbomb.com/api/franchise/${guid}/?api_key=${key}&format=JSON`
    // console.log(guid)
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    res.render('franchise',{"data":data});
});

app.get("/company", async function(req, res){
    guid = req.query.company
    console.log(guid)
    let url =`https://www.giantbomb.com/api/company/${guid}/?api_key=${key}&format=JSON`
    // console.log(guid)
    console.log(url);
    let response = await fetch(url);
    let data     = await response.json();
    res.render('company',{"data":data});
});

app.get("/game", async function(req, res){
    guid = req.query.game
    console.log(guid)
    let url =`https://www.giantbomb.com/api/game/${guid}/?api_key=${key}&format=JSON`
    // console.log(guid)
    console.log(url);
    let response = await fetch(url);
    let data     = await response.json();
    let num = data.results.original_game_rating.length;
    console.log(num)
    res.render('game',{"data":data, "num":num});
});

app.get("/newGame", async function(req, res){
    res.render('newGame');
});
app.get("/newPerson", async function(req, res){
    res.render('newPerson');
});
app.get("/newFranchise", async function(req, res){
    res.render('newFranchise');
});
app.get("/newCompany", async function(req, res){
	  let url = "https://countriesnow.space/api/v0.1/countries/states";
		let data = await fetchData(url);
		//console.log(data);
		res.render('newCompany',{"data":data.data});
});

app.post('/gAdd', async (req,res)=>{
    // console.log(guid)
    let deck = req.body.deck;
    let description = req.body.description;
    let originalRelease = req.body.original_release_date;
    let name = req.body.name;
    let aliases = req.body.aliases;
    let image = req.body.image;
		let platforms=req.body.platform;
		let rating = req.body.rating;
  	 
  // var myJsonString = JSON.stringify(yourArray);
    let platJson = JSON.stringify(platforms)
    let sqlInput = `INSERT INTO g_games
                    (originalReleaseDay, deck, description, image, name, aliases, platforms,userRating)
                    VALUES
                    (?,?,?,?,?,?,?,?)`
    let params = [originalRelease, deck, description, image, name, aliases, platJson,rating];
    executeSQL(sqlInput,params);
    res.render('home')
})

app.post('/cAdd', async (req,res)=>{
		let deck = req.body.deck;
    let description = req.body.description;
    let birthday = req.body.birthday;
    let name = req.body.name;
    let image = req.body.image;
		let firstGame = req.body.firstGame;
		let gender = req.body.gender;
	
		let sqlInput = `INSERT INTO g_people
                    (birthday, deck, description, image, name,firstCreditedGame,gender)
                    VALUES
                    (?,?,?,?,?,?,?)`;
    let params = [birthday, deck, description, image, name,firstGame,gender];
    executeSQL(sqlInput,params);
    res.render('home');
})
app.post('/fAdd', async (req,res)=>{
		description = req.body.description;
		deck = req.body.deck;
		name = req.body.name;
		aliases = req.body.aliases;
		image = req.body.image;
		let sqlInput = `INSERT INTO g_franchises
      (deck, description, aliases, image, name)
      VALUES
      (?, ?, ?, ?, ?)`
		let params = [deck, description, aliases, image, name];
		executeSQL(sqlInput,params);
    res.render('home');
})

app.post('/compAdd', async (req,res)=>{
		let dateFounded = req.body.foundDate;
		let description = req.body.description;
		let deck = req.body.deck;
		let name = req.body.name;
		let aliases = req.body.aliases;
		let image = req.body.image;
		let address = req.body.address;
		let city = req.body.city;
		let country = req.body.country;
		let state = req.body.state;
		let website = req.body.website;
					
		let sqlInput = `INSERT INTO g_companies
      (dateFounded, deck, description, aliases, image, name, address, city, country, state, website)
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
			let params = [dateFounded, deck, description, aliases, image, name, address, city, country, state, website];
			executeSQL(sqlInput,params);
    res.render('home');
})

app.post('/newFranchise', async (req,res)=>{
    console.log(guid)
    let url =`https://www.giantbomb.com/api/franchise/${guid}/?api_key=${key}&format=JSON`
    // console.log(guid)
    console.log(url);
    let response = await fetch(url);
    let data     = await response.json();
    let aliases = data.results.aliases;
    let deck = data.results.deck;
    let description = data.results.description;
    let image = data.results.image.original_url;
    let name = data.results.name;
    let sqlInput = `INSERT INTO g_franchises
                    (aliases, description, deck, image, name)
                    VALUES
                    (?,?,?,?,?)`
    let params = [aliases,description,deck,image,name];
    executeSQL(sqlInput,params);
    res.render('/fSearch');
})

app.post('/newCompany', async (req,res)=>{
    let url =`https://www.giantbomb.com/api/company/${guid}/?api_key=${key}&format=JSON`
    // console.log(guid)
    console.log(url);
    let response = await fetch(url);
    let data     = await response.json();
    let aliases = data.results.aliases;
    let founded = data.results.date_founded;
    let deck = data.results.deck;
    let description = data.results.description
    let image = data.results.image.original_url;
    let address = data.results.location_address;
    let city = data.results.location_city;
    let country = data.results.location_country;
    let state = data.results.location_state;
    let website = data.results.website;
    let name = data.results.name;

    let sqlInput = `INSERT INTO g_companies
                    (aliases, dateFounded, deck, description, image,address,city,country,state,name,website)
                    VALUES
                    (?,?,?,?,?,?,?,?,?,?,?)`
    let params = [aliases,founded,deck,description,image,address,city,country,state,name,website];
    executeSQL(sqlInput,params);
    console.log(data.results.deck);
    res.render('compSearch');
})

app.post('/newCharacter', async (req,res)=>{
    let url =`https://www.giantbomb.com/api/character/${guid}/?api_key=${key}&format=JSON`
    // console.log(guid)
    console.log(url);
    let response = await fetch(url);
    let data     = await response.json();
    let birthday = data.results.birthday;
    let deck = data.results.deck;
    let description = data.results.description;
    let firstApp = data.results.first_appeared_in_game.name;
    let name = data.results.name;
    let image = data.results.image.original_url;
    let gender = data.results.gender;

    let sqlInput = `INSERT INTO g_people
                    (birthday, deck, description, firstCreditedGame, gender, image, name)
                    VALUES
                    (?,?,?,?,?,?,?)`
    let params = [birthday,deck,description,firstApp, gender,image,name];
    executeSQL(sqlInput,params);
    console.log(data.results.deck);
    res.render('cSearch');
})



app.get("/dbTest", async function(req, res){
    let sql = "SELECT CURDATE()";
    let rows = await executeSQL(sql);
    res.send(rows);
});//dbTest

 //functions
async function executeSQL(sql, params){
    return new Promise (function (resolve, reject) {
    pool.query(sql, params, function (err, rows, fields) {
        if (err) throw err;
            resolve(rows);
        });
    });
}//executeSQL
async function fetchData(url){
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    return data;
}


async function loadPeopleDatabase(){  
	let offset =0;
	//1904
	for(let j =0; j<5; j++){
	    let url = `https://www.giantbomb.com/api/people/?api_key=${key}&format=JSON&resources=person&limit=100&offset=${offset}`;
		console.log(url)
	    let response = await fetch(url);
	    let data = await response.json();
			let birthday;
    	let deck;
    	let description;
    	let firstApp;
    	let name;
    	let image;
    	let gender;
	    for(let i = 0; i < data.results.length;i++){
	        birthday = data.results[i].birth_date;
					description = data.results[i].description;
					deck = data.results[i].deck;
					name = data.results[i].name;
					gender = data.results[i].gender;
					firstApp=data.results[i].first_appeared_in_game
					image = data.results[i].image.original_url


					let sqlInput = `INSERT INTO g_people
                    (birthday, deck, description, firstCreditedGame, gender, image, name)
                    VALUES
                    (?,?,?,?,?,?,?)`
			    let params = [birthday,deck,description,firstApp, gender,image,name];
			    executeSQL(sqlInput,params);
				await sleep(1000);
	    }
		offset+=100;
		await sleep(1000);
	}	
}

async function loadGameDatabase(){  
	let offset =0;
	//803
	for(let j =0; j<5; j++){
	    let url = `https://www.giantbomb.com/api/games/?api_key=${key}&format=JSON&resources=person&limit=100&offset=${offset}`;
		console.log(url)
	    let response = await fetch(url);
	    let data = await response.json();
			let releaseDate;
    	let deck;
    	let description;
    	let aliases;
    	let name;
    	let image;
    	let platform;
			let rating;
	    for(let i = 0; i < data.results.length;i++){
	        releaseDate = data.results[i].original_release_date;
					description = data.results[i].description;
					deck = data.results[i].deck;
					name = data.results[i].name;
					aliases = data.results[i].aliases;
					platform = data.results[i].platform;
					image = data.results[i].image.original_url;
					rating = data.results[i].rating;
					let sqlInput = `INSERT INTO g_games
                    (releaseDate, deck, description, aliases, platform, image, name,rating)
                    VALUES
                    (?,?,?,?,?,?,?,?)`
			    let params = [releaseDate, deck, description, aliases, platform, image, name, rating];
			    executeSQL(sqlInput,params);
				await sleep(1000);
	    }
		offset+=100;
		await sleep(1000);
	}	
}

async function loadCompanyDatabase(){ 
	let offset =0;
	//224
	for(let j =0; j<5; j++){
	    let url = `https://www.giantbomb.com/api/companies/?api_key=${key}&format=JSON&resources=person&limit=100&offset=${offset}`;
		console.log(url)
	    let response = await fetch(url);
	    let data = await response.json();
			let dateFounded;
    	let deck;
    	let description;
    	let aliases;
    	let name;
    	let image;
    	let address;
			let city;
			let country;
			let state;
			let website;
		
	    for(let i = 0; i < data.results.length;i++){
	        dateFounded = data.results[i].date_Founded;
					description = data.results[i].description;
					deck = data.results[i].deck;
					name = data.results[i].name;
					aliases = data.results[i].aliases;
					image = data.results[i].image.original_url;
					address = data.results[i].location_address;
					city = data.results[i].location_city;
				  country = data.results[i].location_country;
					state = data.results[i].location_state;
					website = data.results[i].website;
					
					let sqlInput = `INSERT INTO g_companies
                    (dateFounded, deck, description, aliases, image, name, address, city, country, state, website)
                    VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
			    let params = [dateFounded, deck, description, aliases, image, name, address, city, country, state, website];
			    executeSQL(sqlInput,params);
				await sleep(1000);
	    }
		offset+=100;
		await sleep(1000);
	}	
}

async function loadFranchiseDatabase(){
	//52
	let offset=0;
	for(let j =0; j<5; j++){
	    let url = `https://www.giantbomb.com/api/franchises/?api_key=${key}&format=JSON&resources=person&limit=100&offset=${offset}`;
		console.log(url)
	    let response = await fetch(url);
	    let data = await response.json();
    	let deck;
    	let description;
    	let aliases;
    	let name;
    	let image;
	    for(let i = 0; i < data.results.length;i++){
					description = data.results[i].description;
					deck = data.results[i].deck;
					name = data.results[i].name;
					aliases = data.results[i].aliases;
					image = data.results[i].image.original_url;
					
					let sqlInput = `INSERT INTO g_franchises
                    (deck, description, aliases, image, name)
                    VALUES
                    (?, ?, ?, ?, ?)`
			    let params = [deck, description, aliases, image, name];
			    executeSQL(sqlInput,params);
				await sleep(1000);
	    }
		offset+=100;
		await sleep(1000);
	}	
}

//values in red must be updated
function dbConnection(){

    const pool  = mysql.createPool({

       connectionLimit: 10,
       host: process.env['dbHost'],
       user: process.env['dbUser'],
       password: process.env['dbPassword'],
       database: process.env['db']
    }); 

    return pool;
} //dbConnection
//start server
app.listen(3000, () => {
console.log("Expresss server running...")
} )

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}