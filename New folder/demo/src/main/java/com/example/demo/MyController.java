package com.example.demo;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {
	
	@GetMapping("/greeting")
	public ResponseEntity<?> greeting(){
		return ResponseEntity.ok("Hello");
	}
	
	@CrossOrigin(origins = {"http://localhost:3000", "http://node-server:3000" , "https://restapi.tu.ac.th/api/v1/auth/Ad/verify"})
	@POSTMapping("/auth")
    public ResponseEntity<Response> handleLogin(@RequestBody User user){

		LocalDateTime requestDateTime = LocalDateTime.now();

		Response response = new Response(requestDateTime, user.getUsername(), user.getPassword());

        return ResponseEntity.ok(response);
    }
	
}
