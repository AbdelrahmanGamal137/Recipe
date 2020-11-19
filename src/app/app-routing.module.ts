import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/core/home/home.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list/shopping-list.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService] },
  { path: 'recipes', loadChildren: () => import('./components/recipes/recipes.module').then(m => m.RecipesModule) },
  // { path: '', redirectTo: '/signin', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
