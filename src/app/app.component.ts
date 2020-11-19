import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyDzzsXmCpKOv4BKum5tsS7Fn1bUQq4wMgU",
      authDomain: "recipe-fddfa.firebaseapp.com"
    });
  }

}
