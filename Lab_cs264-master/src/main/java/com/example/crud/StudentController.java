package com.example.crud;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class StudentController {

	@Autowired
	private StudentRepository userRepository;
	
	@GetMapping
	public List<Students> getAlluser(){
		return userRepository.findAll();
	}
	
	@PostMapping
	public Students createStudents(@RequestBody Students Students ) {
		return userRepository.save(Students);
	}
}