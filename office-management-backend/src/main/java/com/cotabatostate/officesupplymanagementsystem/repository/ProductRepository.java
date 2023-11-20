package com.cotabatostate.officesupplymanagementsystem.repository;

import com.cotabatostate.officesupplymanagementsystem.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
