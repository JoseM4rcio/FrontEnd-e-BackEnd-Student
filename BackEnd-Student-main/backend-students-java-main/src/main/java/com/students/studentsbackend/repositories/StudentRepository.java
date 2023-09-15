package com.students.studentsbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.students.studentsbackend.entities.Student;

public interface StudentRepository extends JpaRepository<Student,Long> {
    
}
