package com.cotabatostate.officesupplymanagementsystem.controller;

import com.cotabatostate.officesupplymanagementsystem.dto.OrderDto;
import com.cotabatostate.officesupplymanagementsystem.model.Order;
import com.cotabatostate.officesupplymanagementsystem.repository.OrderRepository;
import com.cotabatostate.officesupplymanagementsystem.repository.UserRepository;
import com.cotabatostate.officesupplymanagementsystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    UserRepository userRepository;


    @PostMapping(value = "/create")
    public OrderDto createOrder(@RequestBody OrderDto orderDTO) {
        return orderService.createOrder(orderDTO);
    }

    @GetMapping("/list")
    public List<Order> getListOrder() {
        return orderService.getListOrder();
    }

    @GetMapping("/list/{orderId}")
    private Order getOrderById(@PathVariable("orderId") long orderId) {
        return orderService.getOrderById(orderId);
    }

    @GetMapping("/{email}")
    private List<Order> getOrderByEmail(@PathVariable("email") String email) {
        return orderService.getOrderByEmail(email);
    }

    @PutMapping("/updateOrderList/{orderId}")
    public Order updateOrderById(@PathVariable("orderId") long orderId, @RequestBody Order order) {
        orderService.updateOrderById(orderId, order);
        return order;
    }


    @DeleteMapping("/delete/{orderId}")
    private String deleteOrderById(@PathVariable("orderId") long orderId, @RequestBody Order order) {
        orderService.deleteOrderById(orderId, order);
        return "order deleted";
    }

    @GetMapping("/list-sales")
    private List<OrderRepository.sumOfTotalPrice> getByDayPrice() {
        return orderService.priceByDay();
    }

    @GetMapping("/total-price")
    public ResponseEntity<Double> getTotalPriceOfCompletedOrders() {
        Double totalPrice = orderService.getTotalPriceOfCompletedOrders();
        return ResponseEntity.ok(totalPrice);
    }

}
