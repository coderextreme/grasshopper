/// <reference path="typings/angular2/angular2.d.ts"/>

import {
	Component, View, bootstrap, NgFor
} from 'angular2/angular2';

class MenuItem {
	id: string;
	name: string;
}

class Menu {
	name: string;
	items: Array<MenuItem[]>;
	constructor(name, items) {
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
  directives: [NgFor]
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

				{
					id: "search_courses",
					name: "Search Courses"
				},
				{
					id: "search_blogs",
					name: "Search Blogs"
				},
				{
					id: "search_students",
					name: "Search for Students"
				},
				{
					id: "search_teachers",
					name: "Search for Teachers"
				},
				{
					id: "teacher_courses",
					name: "My Courses"
				},
				{
					id: "teacher_newcourse",
					name: "Add a New Course"
				},
				{
					id: "teacher_manual",
					name: "Teacher Manual"
				},
				{
					id: "teacher_profile",
					name: "Teacher Profile"
				},
				{
					id: "teacher_delegate",
					name: "Delegate to Another Teacher"
				}
			]
		));
	this.menus.push(new Menu(
			"Student",
			[
				{
					id: "search_courses",
					name: "Search Courses"
				},
				{
					id: "search_blogs",
					name: "Search Blogs"
				},
				{
					id: "search_students",
					name: "Search for Students"
				},
				{
					id: "search_teachers",
					name: "Search for Teachers"
				},
				{
					id: "student_courses",
					name: "My Courses"
				},
				{
					id: "student_newcourse",
					name: "Sign up for a Course"
				},
				{
					id: "student_manual",
					name: "Student Manual"
				},
				{
					id: "student_profile",
					name: "Student Profile"
				}
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
