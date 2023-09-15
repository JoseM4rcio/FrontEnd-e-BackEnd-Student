import { Student } from '../student';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.css']
})
export class FormStudentComponent implements OnChanges{
  @Input()
  student: Student = {} as Student;

  @Output()
  saveEvent = new EventEmitter<Student>();

  @Output()
  cleanEvent = new EventEmitter<void>();

  formGroupStudent: FormGroup;

  constructor(
    private studentService: StudentService, private formBuilder: FormBuilder
  ){
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      phone: [''],
      addres: [''],
      course: [''],
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formGroupStudent.setValue(this.student);
  }

  save() {
    if(this.formGroupStudent.valid){
      this.saveEvent.emit(this.formGroupStudent.value);
      this.formGroupStudent.reset();
    }
  }

  clean(){
    this.cleanEvent.emit();
    this.formGroupStudent.reset();
  }
}
