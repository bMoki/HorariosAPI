package com.IFRSErechim.HorariosAPI.Login.Service;

import com.IFRSErechim.HorariosAPI.Exception.AlreadyExistsException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
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
        UserDetails details =  new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
        return details;
    }

    public MessageResponseDTO saveUser(UsuarioDTO usuarioDTO) throws AlreadyExistsException {
        Usuario userToSave = new Usuario(usuarioDTO);
        if(usuarioRepository.isUsernameRegistered(userToSave.getUsername()) > 0){
            throw new AlreadyExistsException("Username já cadastrado!");
        }


        Collection<Role> roles= new ArrayList<>();
        roles.add(roleRepository.findByName("ROLE_USER"));
        if(usuarioDTO.getAdmin()){
            roles.add(roleRepository.findByName("ROLE_ADMIN"));
        }

        userToSave.addRoles(roles);

        userToSave.setPassword(passwordEncoder.encode(userToSave.getPassword()));
        Usuario userSaved = usuarioRepository.save(userToSave);

        return criaMessageResponse("Usuário "+userSaved.getName()+" cadastrado!");
    }

    public MessageResponseDTO updateUser(Long id,UsuarioDTO usuarioDTO) throws NotFoundException{
        Usuario usuario = verifyIfExistsById(id);
        Usuario usuarioToUpdate = new Usuario(usuarioDTO);

        if(usuarioToUpdate.getPassword() == null){
            usuarioToUpdate.setPassword(usuario.getPassword());
        }else{
            usuarioToUpdate.setPassword(passwordEncoder.encode(usuarioToUpdate.getPassword()));
        }

        Collection<Role> roles= new ArrayList<>();
        roles.add(roleRepository.findByName("ROLE_USER"));
        if(usuarioDTO.getAdmin()){
            roles.add(roleRepository.findByName("ROLE_ADMIN"));
        }

        usuarioToUpdate.addRoles(roles);

        Usuario updatedUsuario = usuarioRepository.save(usuarioToUpdate);
        return criaMessageResponse("Usuário "+updatedUsuario.getName()+" atualizado!");
    }

    private Usuario verifyIfExistsById(Long id) throws NotFoundException {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Usuário"));
    }

    public Role saveRole(Role role) throws AlreadyExistsException {
        if(roleRepository.findByName(role.getName()) != null){
            throw new AlreadyExistsException("Role já cadastrado!");
        }

        return roleRepository.save(role);
    }

    public void addRoleToUser(String username, String roleName) {
        Usuario user = usuarioRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    public Usuario findByUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public Page<UsuarioDTO> findAll(Pageable pageable, String search) {
        Page<Usuario> result = usuarioRepository.findAllUsuarios(pageable, search);
        return result.map(x->new UsuarioDTO(x));
    }

    private MessageResponseDTO criaMessageResponse(String message) {
        return MessageResponseDTO
                .builder()
                .message(message)
                .build();
    }


    public MessageResponseDTO delete(Long id) throws NotFoundException {
        Usuario usuarioToDelete = verifyIfExistsById(id);
        usuarioToDelete.setRoles(new ArrayList<>());

        usuarioRepository.deleteById(id);
        return criaMessageResponse("Usuário "+usuarioToDelete.getName()+ " deletado!");
    }

}
