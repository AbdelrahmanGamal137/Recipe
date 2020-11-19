import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Ingredient } from '../models/ingredient';
import {Recipe} from './../models/recipe'
import { ShoppingListService } from './shopping-list.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes:Recipe[]=[
    new Recipe('first recipe','description 1', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
    [
      new Ingredient("aaa",3),
      new Ingredient("aa",2),
      new Ingredient("a",1),
    ]),
    new Recipe('second recipe','description 2', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
    [
      new Ingredient("aa",2),
      new Ingredient("a",1),
    ]),
    new Recipe('third recipe','description 3', 'https://p0.pikist.com/photos/111/233/shrimp-pasta-food-meal-cuisine-traditional-fresh-basil-delicious.jpg',
    [])
  ]

  constructor(private slService:ShoppingListService, private httpClient: HttpClient, private authService: AuthService) { }

  recipesChanged = new Subject<Recipe[]>();

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  
  addIngreientToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes);
  }

  storeRecipes() {
    const tokent = this.authService.getToken();

    return this.httpClient.put('https://recipe-fddfa.firebaseio.com/recipes.json', this.recipes);
  }

  fetchRecipes() {
    const tokent = this.authService.getToken();
    this.httpClient.get<Recipe[]>('https://recipe-fddfa.firebaseio.com/recipes.json')
      .subscribe(
        (response) => {
          // console.log(response);
          // const recipes: Recipe[] = response.json();
          this.setRecipes(response);
        }
      )
  }

}
