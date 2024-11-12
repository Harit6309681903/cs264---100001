package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;

@Column(name="first_name", nullable=false)
private String firstname;

@Column(name="last_name", nullable=false)
private String lastname;

@Column(name="email", nullable=false, unique=true)
private String email;
}
