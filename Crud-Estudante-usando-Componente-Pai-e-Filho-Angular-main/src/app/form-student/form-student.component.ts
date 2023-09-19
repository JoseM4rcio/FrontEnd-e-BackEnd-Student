import { Student } from '../student';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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
  submitted: boolean = false;

  constructor(
    private studentService: StudentService, private formBuilder: FormBuilder
  ){
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: ['',  [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      course: ['', [Validators.required]],
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.student.id){
      this.formGroupStudent.setValue(this.student);
    }
  }

  save() {
    this.submitted = true;
    if (this.formGroupStudent.valid) {
      this.saveEvent.emit(this.formGroupStudent.value);
      this.formGroupStudent.reset();
      this.submitted = false;
    }
  }

  clean(){
    this.cleanEvent.emit();
    this.formGroupStudent.reset();
    this.submitted = false;
  }


  get name(): any {
    return this.formGroupStudent.get("name");
  }

  get email(): any {
    return this.formGroupStudent.get("email");
  }

  get phone(): any {
    return this.formGroupStudent.get("phone");
  }
  
  get address(): any {
    return this.formGroupStudent.get("address");
  }

  get course(): any {
  return this.formGroupStudent.get("course");
  }

}
