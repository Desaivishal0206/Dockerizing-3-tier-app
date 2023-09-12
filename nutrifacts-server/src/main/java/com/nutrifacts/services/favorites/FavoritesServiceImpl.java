package com.nutrifacts.services.favorites;

import com.nutrifacts.dto.FavoritesDto;
import com.nutrifacts.entity.Favorites;
import com.nutrifacts.entity.User;
import com.nutrifacts.repo.FavoritesRepo;
import com.nutrifacts.repo.UserRepo;
import com.nutrifacts.responce.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.FileAttributeView;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoritesServiceImpl implements FavoritesService{

    @Autowired
    private FavoritesRepo favoritesRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public GeneralResponse addFavorites(FavoritesDto favoritesDto) {
        GeneralResponse response = new GeneralResponse();
        User user = null;
        Optional<User> userOptional = userRepo.findById(favoritesDto.getUserId());
            if (userOptional.isPresent()) {
                if(!favoritesRepo.existsByFdcIdAndUser(favoritesDto.getFdcId(),userOptional.get())) {
                    user = userOptional.get();

                    Favorites favorites = new Favorites();

                    favorites.setFdcId(favoritesDto.getFdcId());

                    favorites.setUser(user);

                    favoritesRepo.save(favorites);
                    response.setMessage("Favorites Added Successfully");
                    response.setStatus(HttpStatus.CREATED);
                }
                else{
                    response.setStatus(HttpStatus.NOT_ACCEPTABLE);
                    response.setMessage("Already in Favourite List");
                }
            } else {
                response.setStatus(HttpStatus.NOT_ACCEPTABLE);
                response.setMessage("User Not Found");
            }
        return response;
    }

    @Override
    public List<String> getAllFavorites(Long userId){
        return favoritesRepo.findAllByUserId(userId).stream().map(Favorites::getFdcId).collect(Collectors.toList());
    }

    @Override
    public void deleteFavorite(String id){
      Optional<Favorites> optionalFavorites = favoritesRepo.findByFdcId(id);
      if(optionalFavorites.isPresent()){
          favoritesRepo.delete(optionalFavorites.get());
      }
    }
}
