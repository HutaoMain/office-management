package com.cotabatostate.officesupplymanagementsystem.service;

import com.cotabatostate.officesupplymanagementsystem.dto.OrderDto;
import com.cotabatostate.officesupplymanagementsystem.dto.ProductQuantityDto;
import com.cotabatostate.officesupplymanagementsystem.model.Order;
import com.cotabatostate.officesupplymanagementsystem.model.Product;
import com.cotabatostate.officesupplymanagementsystem.repository.OrderRepository;
import com.cotabatostate.officesupplymanagementsystem.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    public OrderDto createOrder(OrderDto orderDTO) {
        Order order = new Order();
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setStatus(orderDTO.getStatus());
        order.setCreatedDate(orderDTO.getCreatedDate());
        order.setDateNow(orderDTO.getDateNow());
        order.setEmail(orderDTO.getEmail());
        order.setOrderJsonList(orderDTO.getOrderJsonList());
        List<ProductQuantityDto> productQuantities = orderDTO.getProducts();
        subtractProductsFromInventory(productQuantities);
//        updateProductSold(productQuantities);
        orderRepository.save(order);
        return orderDTO;
    }

    private void subtractProductsFromInventory(List<ProductQuantityDto> productQuantities) {
        for (ProductQuantityDto pq : productQuantities) {
            Optional<Product> productOptional = productRepository.findById(pq.getProductId());
            if (productOptional.isPresent()) {
                Product product = productOptional.get();
                product.setQuantity(product.getQuantity() - pq.getQuantity());
                productRepository.save(product);
            } else {
                log.error("error in subtractProductsFromInventory");
            }
        }
    }

    public List<Order> getListOrder() {
        return orderRepository.findAll();
    }

    public Order getOrderById(long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }


    public List<Order> getOrderByEmail(String email) {
        return orderRepository.findByEmail(email);
    }

    public void updateOrderById(long orderId, Order getOrder) {
        Order setOrder = orderRepository.getReferenceById(orderId);
        setOrder.setOrderJsonList(getOrder.getOrderJsonList());
        orderRepository.save(setOrder);
    }


    public void deleteOrderById(long orderId, Order order) {
        orderRepository.deleteById(orderId);
    }

    public List<OrderRepository.sumOfTotalPrice> priceByDay() {
        return orderRepository.getByDate();
    }

    public Double getTotalPriceOfCompletedOrders() {
        List<Order> completedOrders = orderRepository.findByStatus("completed");
        Double totalPrice = 0.0;
        for (Order order : completedOrders) {
            totalPrice += order.getTotalPrice();
        }
        return totalPrice;
    }
}
