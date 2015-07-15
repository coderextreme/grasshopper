/// <reference path="typings/angular2/angular2.d.ts"/>

import {
	Component, View, bootstrap, NgFor
} from 'angular2/angular2';

@Component({
	selector: '#{{id}}'
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

@Component({
	selector: '#call',
})
class Call {
  teacher: HTMLInputElement;
  student: HTMLInputElement;
  constructor() {
	this.student = document.getElementById('student');
	if (this.student !== null) {
		this.student.value = "student";
	}
	this.teacher = document.getElementById('teacher');
	if (this.teacher !== null) {
		this.teacher.value = "teacher";
	}
  }
  getTeacherValue() {
	this.teacher = document.getElementById('teacher');
	return this.teacher.value;

  }
  getStudentValue() {
	this.student = document.getElementById('student');
	return this.student.value;
  }
}

var peers = new Call();

@Component({
	selector: 'project',
})
@View({
	template: ' <div id="project"><video id="myvideo" src="{{videoUrl}}" autoplay></video></div> <div><button (click)="answerCalls()">Answer Calls</button></div> <video id="peervideo" src="{{videoUrl}}" autoplay></video><div><button (click)="call()">Call</button></div>',
})
class ProjectVideoComponent {
    videoUrl: string;
    myStream: MediaStream;
    constructor() {
	navigator.getUserMedia  = navigator.getUserMedia ||
				  navigator.webkitGetUserMedia ||
				  navigator.mozGetUserMedia ||
				  navigator.msGetUserMedia;

	if (navigator.getUserMedia) {
		var errorCallback = function(e) {
		    alert('Call failed!');
		};
		navigator.getUserMedia({audio:true, video:{mandatory:{minWidth:1280,minHeight:720}}}, function(myStream) {
			var myvideo = document.getElementById('myvideo');
			myvideo.src = window.URL.createObjectURL(myStream);
			this.myStream = myStream;
		}, errorCallback);
	}
	this.videoUrl = "foo.mp4";
    }
    answerCalls() {
	// var peer = new Peer(peers.getTeacherValue(), {key: 'mnd6i13qm362bj4i'});
	var peer = new Peer(peers.getTeacherValue(), {host: '52.10.34.169', port:9000});
	peer.on('call', function (call) {
		call.answer(myStream); // Answer the call with an A/V stream.
		call.on('stream', function(peerStream) {
			var peervideo = document.getElementById('peervideo');
			peervideo.src = window.URL.createObjectURL(peerStream);
		});
	});
    }
    call() {
	// var peer = new Peer(peers.getStudentValue(), {key: 'mnd6i13qm362bj4i'});
	var peer = new Peer(peers.getStudentValue(), {host: '52.10.34.169', port:9000});
	var call = peer.call(peers.getTeacherValue(), myStream);
	call.on('stream', function(peerStream) {
		var peervideo = document.getElementById('peervideo');
		peervideo.src = window.URL.createObjectURL(peerStream);
	});
    }
}

// Annotation section
@Component({
  selector: 'my-app'
})
@View({
  templateUrl: 'menu.html',
  directives: [NgFor, MenuItem, ProjectVideoComponent]
})

// Component controller
class MyAppComponent {
  id: string;
  teacherview: string;
  teachermodify: string;
  teacherdelegate: string;
  menus: Array<Menu>;
  
  constructor() {
    this.id = 'teacher_project';
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
					"teacher_project",
					"Project Course"
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
