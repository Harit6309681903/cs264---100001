package com.example.crud;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="students")
public class Students {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ; 
	
	@Column(name = "user_name" , nullable=false)
	private String userName ; 
	
	@Column(name = "email", unique = true)
	private String email ;
	
	@Column(name = "faculty" , nullable=false)
	private String faculty ; 
	
	@Column(name = "type" , nullable=false)
	private String type ; 

	@Column(name = "ID_student" , nullable=false)
	private String idStudent ;
	
	@Column(name = "house_NUMBER" , nullable=false)
	private String houseNumber ;
	
	@Column(name = "sub_District" , nullable=false)
	private String subDistrict ;
	
	@Column(name = "district" , nullable=false)
	private String district ;

	@Column(name = "country_student" , nullable=false)
	private String country ;

	@Column(name = "postcode" , nullable=false)
	private String postcode ;

	@Column(name = "phone_number" , nullable=false)
	private String phoneNumber ;

	@Column(name = "ID_Subject" , nullable=false)
	private String idSubject ;
	
	@Column(name = "name_Subject" , nullable=false)
	private String nameSubject ;
	
	@Column(name = "Section_Subject" , nullable=false)
	private String sectionColum ;
	
	@Column(name = "date_Subject" , nullable=false)
	private String dataSubject ;
	
	@Column(name = "unit_Subject" , nullable=false)
	private String unitSubject ;
	
	@Column(name = "Teacher_Subject" , nullable=false)
	private String teacherSubject ;
}