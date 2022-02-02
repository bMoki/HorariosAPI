package com.IFRSErechim.HorariosAPI.Login.Controller;

import com.IFRSErechim.HorariosAPI.Exception.AlreadyExistsException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Login.DTO.UsuarioDTO;
import com.IFRSErechim.HorariosAPI.Login.Domain.Role;
import com.IFRSErechim.HorariosAPI.Login.Domain.Usuario;
import com.IFRSErechim.HorariosAPI.Login.Service.LoginService;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/usuario")
public class LoginController {
    private final LoginService loginService;

    @GetMapping("/info")
    public ResponseEntity<Page<UsuarioDTO>>findAll(@PageableDefault(size = 6 ) Pageable pageable){
        Page<UsuarioDTO> list = loginService.findAll(pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/info/{username}")
    public ResponseEntity<UsuarioDTO>findByUsername(@PathVariable String username){
        return ResponseEntity.ok().body(new UsuarioDTO(loginService.findByUsername(username)));
    }

    @PostMapping("/save")
    public MessageResponseDTO saveUser(@RequestBody UsuarioDTO usuarioDTO) throws AlreadyExistsException {
        return loginService.saveUser(usuarioDTO);
    }

    @PutMapping("/save/{id}")
    public MessageResponseDTO updateUser(@PathVariable Long id, @RequestBody @Valid UsuarioDTO usuarioDTO) throws NotFoundException {
        return loginService.updateUser(id,usuarioDTO);
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role>saveRole(@RequestBody Role role) throws AlreadyExistsException {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/usuario/role/save").toUriString());
        return ResponseEntity.created(uri).body(loginService.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<?>addRoleToUser(@RequestBody RoleToUsuarioForm form){
        loginService.addRoleToUser(form.getUsername(), form.getRolename());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public MessageResponseDTO delete (@PathVariable Long id) throws NotFoundException {
        return loginService.delete(id);
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try{
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                Usuario user = loginService.findByUsername(username);

                String access_token = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() +20 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .withClaim("admin", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()).contains("ROLE_ADMIN"))
                        .sign(algorithm);



                Map<String,String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(),tokens);

            }catch (Exception exception){
                response.setHeader("error",exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String,String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(),error);
            }

        }else{
            throw new RuntimeException("Refresh token is missing");
        }
    }
}
@Data
class RoleToUsuarioForm {
    private String username;
    private String rolename;
}