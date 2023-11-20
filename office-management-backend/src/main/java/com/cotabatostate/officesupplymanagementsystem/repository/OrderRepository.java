package com.cotabatostate.officesupplymanagementsystem.repository;

import com.cotabatostate.officesupplymanagementsystem.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    interface sumOfTotalPrice {
        Double getTotalPrice();

        LocalDate getDateNow();

        String getStatus();
    }

    @Query("SELECT SUM(o.totalPrice) as totalPrice, o.dateNow, o.status FROM Order o WHERE o.status = 'Completed' GROUP BY o.dateNow")
    List<sumOfTotalPrice> getByDate();

    List<Order> findByStatus(String status);

    List<Order> findByEmail(String email);
}
