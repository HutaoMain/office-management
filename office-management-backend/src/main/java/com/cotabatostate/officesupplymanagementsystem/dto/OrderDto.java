package com.cotabatostate.officesupplymanagementsystem.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {

    private Long id;

    private Double totalPrice;

    private String status = "Pending";

    private Long productId;

    private Integer quantity;

    private LocalDateTime createdDate;

    private LocalDate dateNow;

    private String orderJsonList;

    private String email;

    private List<ProductQuantityDto> products;

}
