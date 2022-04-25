import { Partner } from "../../src/app/models/Partner";
import { Food } from "../../src/app/models/Food"


//Script to fill the database with dummy data
//Pwered by themealdb.com
export async function fill() {
    const request = require('request');
    const partners: Partner[] = [];


    await request('http://localhost:3000/api/partner', { json: true }, (err, res, body) => {
        if (err) {
            console.log(err);
        }
        else {
            body.forEach(element => {
                partners.push(element);
            });
            for (let i = 0; i < 20; i++) {
                request('https://www.themealdb.com/api/json/v1/1/random.php', { json: true }, (err, res, body) => {
                    
                    let food: Food = new Food();
                    food.name = body.meals[0].strMeal;
                    food.imageUrl = body.meals[0].strMealThumb;
                    food.price = Math.ceil(Math.random() * (100 - 1) + 1);
                    food.description = body.meals[0].strInstructions;
                    food.partner = partners[Math.floor(Math.random() * partners.length)];
                    food.id = null;
                    request({
                        uri: 'http://localhost:3000/api/createfood',
                        method: 'POST',
                        json: true,
                        body: food
                    }, (err, res, body) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(body);
                        }
                    })
                });
            }
        }
    })





}