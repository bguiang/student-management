package com.bernardguiang.studentmanagement.student;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/students")
public class StudentController {
	
	@GetMapping()
	public List<Student> getAllStudents() {
		List<Student> students = Arrays.asList(
				new Student(
						1L, 
						"Bernard",
						"bernard@gmail.com",
						Gender.MALE
				),
				new Student(
						2L, 
						"Bernard2",
						"bernard2@gmail.com",
						Gender.MALE
				)
		);
		
		return students;
	}
}
