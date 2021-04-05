package com.bernardguiang.studentmanagement.student.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Gives client 404 instead of 500 error
public class StudentNotFoundException extends RuntimeException{
	
	public StudentNotFoundException(String message) {
		super(message);
	}
}
