package com.nutrifacts.controller;

import com.nutrifacts.dto.FavoritesDto;
import com.nutrifacts.responce.GeneralResponse;
import com.nutrifacts.services.favorites.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorites")
public class FavoritesController {

    @Autowired
    private FavoritesService favoritesService;

    @PostMapping("")
    public GeneralResponse addFavorite(@RequestBody FavoritesDto favoritesDto) {
        GeneralResponse response = new GeneralResponse();
        try {
            return favoritesService.addFavorites(favoritesDto);
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("{userId}")
    public GeneralResponse getAllFavorite(@PathVariable Long userId) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(favoritesService.getAllFavorites(userId));
             response.setStatus(HttpStatus.OK);
             return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @DeleteMapping("{id}")
    public GeneralResponse deleteFavorite(@PathVariable String id) {
        GeneralResponse response = new GeneralResponse();
        try {
            favoritesService.deleteFavorite(id);
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }
}
