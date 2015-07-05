/// <reference path="typings/angular2/angular2.d.ts"/>

import {
	Component, View, bootstrap, NgFor
} from 'angular2/angular2';

@Component({
	selector: '#{{id}}'
})
@View({
	template: '<div style="display:none;" id="{{id}}">{{name}}</div>',
})
class MenuItem {
	id: string;
	name: string;
	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
}

class Menu {
	name: string;
	items: Array<MenuItem[]>;
	constructor(name: string, items) {
		this.name = name;
		this.items = items;
	};
}

// Annotation section
@Component({
  selector: 'my-app'
})
@View({
  templateUrl: 'menu.html',
  directives: [NgFor, MenuItem]
})

// Component controller
class MyAppComponent {
  id: string;
  teacherview: string;
  teachermodify: string;
  teacherdelegate: string;
  menus: Array<Menu>;
  
  constructor() {
    this.id = 'Alice';
    this.teacherview = 'Alice';
    this.teachermodify = 'Alice';
    this.teacherdelegate = 'Alice';
    this.menus = new Array<Menu>();
    this.menus.push(new Menu(
			"Teacher",
			[

				new MenuItem(
					"search_courses",
					"Search Courses"
				),
				new MenuItem(
					"search_blogs",
					"Search Blogs"
				),
				new MenuItem(
					"search_students",
					"Search for Students"
				),
				new MenuItem(
					"search_teachers",
					"Search for Teachers"
				),
				new MenuItem(
					"teacher_courses",
					"My Courses"
				),
				new MenuItem(
					"teacher_newcourse",
					"Add a New Course"
				),
				new MenuItem(
					"teacher_manual",
					"Teacher Manual"
				),
				new MenuItem(
					"teacher_profile",
					"Teacher Profile"
				),
				new MenuItem(
					"teacher_delegate",
					"Delegate to Another Teacher"
				)
			]
		));
	this.menus.push(new Menu(
			"Student",
			[
				new MenuItem(
					"search_courses",
					"Search Courses"
				),
				new MenuItem(
					"search_blogs",
					"Search Blogs"
				),
				new MenuItem(
					"search_students",
					"Search for Students"
				),
				new MenuItem(
					"search_teachers",
					"Search for Teachers"
				),
				new MenuItem(
					"student_courses",
					"My Courses"
				),
				new MenuItem(
					"student_newcourse",
					"Sign up for a Course"
				),
				new MenuItem(
					"student_manual",
					"Student Manual"
				),
				new MenuItem(
					"student_profile",
					"Student Profile"
				)
			]));
   }
   onClick(id : string) {
	var element = document.getElementById(this.id);
	if (element !== null) {
		element.style.display = "none";
	}
	this.id = id;
	element = document.getElementById(this.id);
	if (element !== null) {
		element.style.display = "block";
	}
   }
}

bootstrap(MyAppComponent);
