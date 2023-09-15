package com.students.studentsbackend.mappers;

import com.students.studentsbackend.dtos.StudentRequest;
import com.students.studentsbackend.dtos.StudentResponse;
import com.students.studentsbackend.entities.Student;

public class StudentMapper {
    
    public static Student toEntity(StudentRequest request) {
        Student student = new Student();
        student.setName(request.name());
        student.setEmail(request.email());
        student.setPhone(request.phone());
        student.setAddres(request.addres());
        student.setCourse(request.course());
        return student;
    }

    public static StudentResponse toDTO(Student student) {
        return new StudentResponse(student.getId(),
                student.getName(),
                student.getEmail(),
                student.getPhone(),
                student.getAddres(),
                student.getCourse());
    }
}
