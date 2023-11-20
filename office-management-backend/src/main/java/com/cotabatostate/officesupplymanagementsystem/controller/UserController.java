package com.cotabatostate.officesupplymanagementsystem.controller;

import com.cotabatostate.officesupplymanagementsystem.dto.LoginDto;
import com.cotabatostate.officesupplymanagementsystem.model.User;
import com.cotabatostate.officesupplymanagementsystem.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
@Slf4j
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    private ResponseEntity<User> registerUser(@RequestBody User user) {
        User newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    private ResponseEntity<String> loginUser(@RequestBody LoginDto loginDto) throws Exception {
        userService.loginUser(loginDto.getEmail(), loginDto.getPassword());
        log.info("eto: {}", loginDto);
        return ResponseEntity.ok("Successfully Logged-in");
    }

    @GetMapping("/{email}")
    private ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
        User userEmail = userService.getUserByEmail(email);
        return ResponseEntity.ok(userEmail);
    }

    @GetMapping("/list")
    private ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = userService.getAllUsers();
        return ResponseEntity.ok(userList);
    }

    @PutMapping("/changePassword/{email}")
    private ResponseEntity<User> updatePassword(@PathVariable("email") String email, @RequestBody User user) {
        User updatedUser = userService.updatePassword(email, user);
        return ResponseEntity.ok(updatedUser);
    }

}
