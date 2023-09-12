package com.nutrifacts.services.favorites;

import com.nutrifacts.dto.FavoritesDto;
import com.nutrifacts.responce.GeneralResponse;

import java.util.List;

public interface FavoritesService {

    GeneralResponse addFavorites(FavoritesDto favoritesDto);

    List<String> getAllFavorites(Long userId);

    void deleteFavorite(String id);
}
