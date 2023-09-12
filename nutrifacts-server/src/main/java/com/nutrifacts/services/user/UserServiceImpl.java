package com.nutrifacts.services.user;

import com.nutrifacts.dto.SignupRequest;
import com.nutrifacts.dto.UserDto;
import com.nutrifacts.entity.User;
import com.nutrifacts.enums.UserRole;
import com.nutrifacts.repo.UserRepo;
import com.nutrifacts.responce.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public void createAdminAccount() {
        User adminAccount = userRepo.findByRole(UserRole.ADMIN);
        if(null == adminAccount){
            User user = new User();
            user.setEmail("admin@gmail.com");
            user.setName("Admin");
            user.setRole(UserRole.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode("tayyab"));
            userRepo.save(user);
        }
    }

    @Transactional
    public UserDto createUser(SignupRequest signupRequest) throws Exception {
        User user = new User(signupRequest.getEmail(), new BCryptPasswordEncoder().encode(signupRequest.getPassword()), signupRequest.getName(), UserRole.USER);
        user = userRepo.save(user);
        if (user == null)
            return  null;

        return user.mapUsertoUserDto();
    }


    public Boolean hasUserWithEmail(String email) {
        return userRepo.findFirstByEmail(email) != null;
    }

    @Override
    public UserDto getUser(Long userId) {
        UserDto userDto = null;
        Optional<User> optionalUser = userRepo.findById(userId);
        if(optionalUser.isPresent()){
            userDto = optionalUser.get().mapUsertoUserDto();
            userDto.setReturnedImg(optionalUser.get().getImg());
        }
        return userDto;
    }

    public GeneralResponse updateUser(UserDto userDto)  {
        GeneralResponse response = new GeneralResponse();
        User user = null;
        try {
            Optional<User> userOptional = userRepo.findById(userDto.getId());
            if (userOptional.isPresent()) {
                user = userOptional.get();

                user.setName(userDto.getName());
                user.setImg(userDto.getImg().getBytes());


                userRepo.save(user);
                response.setMessage("User Updated Successfully");
                response.setStatus(HttpStatus.CREATED);
                return response;
            } else {
                response.setStatus(HttpStatus.NOT_ACCEPTABLE);
                response.setMessage("User Not Found");
                return response;
            }
        }catch (Exception e){
            response.setStatus(HttpStatus.NOT_ACCEPTABLE);
            response.setMessage("Unable to process Img");
            return response;
        }
    }

}
