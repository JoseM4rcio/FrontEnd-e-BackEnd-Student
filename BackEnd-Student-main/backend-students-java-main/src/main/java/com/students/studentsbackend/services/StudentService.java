package com.students.studentsbackend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.students.studentsbackend.dtos.StudentRequest;
import com.students.studentsbackend.dtos.StudentResponse;
import com.students.studentsbackend.entities.Student;
import com.students.studentsbackend.mappers.StudentMapper;
import com.students.studentsbackend.repositories.StudentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public List<StudentResponse> getStudentResponses() {
        List<Student> students = repository.findAll();
        return students.stream()
                .map(StudentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public StudentResponse getStudentResponse(long id) {
        Student student = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        return StudentMapper.toDTO(student);
    }

    public void deleteStudentById(long id) {
        if (this.repository.existsById(id)) {
            this.repository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Student not found");
        }
    }

    public StudentResponse save(StudentRequest student) {
        var entity = this.repository.save(StudentMapper.toEntity(student));
        return StudentMapper.toDTO(entity);
    }

    public void update(long id, StudentRequest student) {
        try {
            var updateStudent = this.repository.getReferenceById(id);
            updateStudent.setName(student.name());
            updateStudent.setEmail(student.email());
            updateStudent.setPhone(student.phone());
            updateStudent.setAddress(student.address());
            updateStudent.setCourse(student.course());
            this.repository.save(updateStudent);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Student not found");
        }
    }
}