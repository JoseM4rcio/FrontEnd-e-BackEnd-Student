import { StudentService } from './../student.service';
import { Student } from './../student';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student: Student[] = [];
  students: Student = {} as Student;
  isEditing: boolean = false;

  constructor(
    private studentService: StudentService
  ) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }
  loadStudents(){
    this.studentService.getStudents().subscribe({
      next: (data) => (this.student = data),
    });
  }

  onCleanEvent() {
    this.isEditing = false;
  }

  onSaveEvent(student: Student) {
    if (this.isEditing) {
      this.studentService.update(student).subscribe({
        next: () => {
          this.loadStudents();
          this.isEditing = true;
        }
      });
    }
    else {
      this.studentService.save(student).subscribe({
        next: data => {
          this.student.push(data)
        }
       });
    }
  }

  clean(){
    this.isEditing = false;
  }

  edit(student: Student) {
    this.students = student;
    this.isEditing = true;
  }

  remove(student: Student) {
    this.studentService.delete(student).subscribe({
      next: () => this.loadStudents(),
    });
  }
}
