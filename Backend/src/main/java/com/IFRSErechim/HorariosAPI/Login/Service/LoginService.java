package com.IFRSErechim.HorariosAPI.Login.Service;

import com.IFRSErechim.HorariosAPI.Login.DTO.UsuarioDTO;
import com.IFRSErechim.HorariosAPI.Login.Domain.Role;
import com.IFRSErechim.HorariosAPI.Login.Domain.Usuario;
import com.IFRSErechim.HorariosAPI.Login.Repository.RoleRepository;
import com.IFRSErechim.HorariosAPI.Login.Repository.UsuarioRepository;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LoginService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = usuarioRepository.findByUsername(username);
        if(user == null){
            log.error("User not found");
            throw new UsernameNotFoundException("Login incorreto");
        }else{
            log.info("User found in the database: {}",username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role-> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }

    public MessageResponseDTO saveUser(UsuarioDTO user) {
        Usuario userToSave = new Usuario(user);

        userToSave.setPassword(passwordEncoder.encode(userToSave.getPassword()));
        Usuario userSaved = usuarioRepository.save(userToSave);

        return criaMessageResponse("Usuário "+userSaved.getName()+" cadastrado!");
    }

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public void addRoleToUser(String username, String roleName) {
        Usuario user = usuarioRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    public UsuarioDTO findByUsername(String username) {
        Usuario user =  usuarioRepository.findByUsername(username);
        return new UsuarioDTO(user);
    }

    public Page<UsuarioDTO> findAll(Pageable pageable) {
        Page<Usuario> result = usuarioRepository.findAll(pageable);
        return result.map(x->new UsuarioDTO(x));
    }

    private MessageResponseDTO criaMessageResponse(String message) {
        return MessageResponseDTO
                .builder()
                .message(message)
                .build();
    }


}
