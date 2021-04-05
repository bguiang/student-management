package com.bernardguiang.studentmanagement.student;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bernardguiang.studentmanagement.student.exception.BadRequestException;
import com.bernardguiang.studentmanagement.student.exception.StudentNotFoundException;

@Service
public class StudentService {
	@Autowired
	private final StudentRepository studentRepository;
	
	public StudentService(StudentRepository studentRepository) {
		this.studentRepository = studentRepository;
	}
	
	public List<Student> getAllStudents() {
		return studentRepository.findAll();
	}

	public void addStudent(Student student) {
		// Check if email is taken
		if(studentRepository.findByEmail(student.getEmail()) != null)
		{
			throw new BadRequestException("Email " + student.getEmail() + " taken");
		}
		
		studentRepository.save(student);
	}

	public void deleteStudent(Long studentId) {
		// Check student exists
		if(studentRepository.findById(studentId) == null)
		{
			throw new StudentNotFoundException("Student ID " + studentId + " not found");
		}
		
		this.studentRepository.deleteById(studentId);
	}
}
