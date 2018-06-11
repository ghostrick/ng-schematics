import { Component, OnInit } from '@angular/core'

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherize(name) %>.component.pug',
  styleUrls: ['./<%= dasherize(name) %>.component.styl']
})
export class <%= classify(name) %>Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
