package com.nutrifacts.repo;

import com.nutrifacts.entity.Favorites;
import com.nutrifacts.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritesRepo extends JpaRepository<Favorites, Long> {

    Boolean existsByFdcIdAndUser(String fdcId, User user);

    List<Favorites> findAllByUserId(Long userId);

    Optional<Favorites> findByFdcId(String fdcId);

    void deleteAllByFdcId(String fdcId);
}
