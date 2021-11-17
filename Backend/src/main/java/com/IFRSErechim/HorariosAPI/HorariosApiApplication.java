package com.IFRSErechim.HorariosAPI;

import com.IFRSErechim.HorariosAPI.Login.DTO.UsuarioDTO;
import com.IFRSErechim.HorariosAPI.Login.Domain.Role;
import com.IFRSErechim.HorariosAPI.Login.Service.LoginService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class HorariosApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(HorariosApiApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run (LoginService loginService){
		return args -> {
			loginService.saveRole(new Role(null,"ROLE_USER"));
			loginService.saveRole(new Role(null,"ROLE_ADMIN"));

			loginService.saveUser(new UsuarioDTO(null,"John Travolta","john","1234",new ArrayList<>()));
			loginService.saveUser(new UsuarioDTO(null,"Jim Carrey","jim","1234",new ArrayList<>()));
			loginService.saveUser(new UsuarioDTO(null,"Arnold Schwarzenegger","arnold","1234",new ArrayList<>()));

			loginService.addRoleToUser("john", "ROLE_USER");
			loginService.addRoleToUser("jim", "ROLE_ADMIN");
			loginService.addRoleToUser("arnold", "ROLE_ADMIN");
			loginService.addRoleToUser("arnold", "ROLE_USER");



		};
	}

}
