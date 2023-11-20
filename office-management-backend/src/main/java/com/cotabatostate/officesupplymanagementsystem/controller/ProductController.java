package com.cotabatostate.officesupplymanagementsystem.controller;

import com.cotabatostate.officesupplymanagementsystem.dto.ProductDto;
import com.cotabatostate.officesupplymanagementsystem.model.Product;
import com.cotabatostate.officesupplymanagementsystem.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/{categoryId}/create")
    private ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    @GetMapping("/list")
    private ResponseEntity<List<Product>> getListProduct() {
        List<Product> products = productService.getListProducts();
        return ResponseEntity.ok(products);
    }

    @PutMapping("/update/{productId}")
    private ResponseEntity<Product> updateProduct(@PathVariable("productId") Long productId, @RequestBody ProductDto productDto) {
        Product product = productService.updateProduct(productDto, productId);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/delete/{productId}")
    private ResponseEntity<String> deleteProduct(@PathVariable("productId") Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok("deleted product ID: " + productId);
    }

    @GetMapping("/list/{productId}")
    private Product getProduct(@PathVariable("productId") Long productId) {
        return productService.getProductById(productId);
    }

}
