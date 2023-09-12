package com.nutrifacts.services.user;


import com.nutrifacts.dto.SignupRequest;
import com.nutrifacts.dto.UserDto;
import com.nutrifacts.responce.GeneralResponse;

public interface UserService {

     UserDto createUser(SignupRequest signupRequest) throws Exception;

     Boolean hasUserWithEmail(String email);

     void createAdminAccount();

     UserDto getUser(Long userId);

     GeneralResponse updateUser(UserDto userDto);

}
