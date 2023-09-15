package com.students.studentsbackend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record StudentRequest(
    
    @NotBlank(message = "Nome não pode ser em branco")
    String name,
    
    @NotBlank(message = "Email não pode ser em branco")
    String email,

    @NotNull(message = "Número de telefone não pode ser nulo")
    String phone,

    @NotBlank(message = "Endereço não pode ser em branco")
    String addres,

    @NotBlank(message = "Curso não pode ser em branco")
    String course

) {
    
}
