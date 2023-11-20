package com.cotabatostate.officesupplymanagementsystem.service;

import com.cotabatostate.officesupplymanagementsystem.dto.ProductDto;
import com.cotabatostate.officesupplymanagementsystem.model.Product;
import com.cotabatostate.officesupplymanagementsystem.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getListProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    public Product updateProduct(ProductDto productDto, Long productId) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            product.setName(productDto.getName());
            product.setDescription(productDto.getDescription());
            product.setPrice(productDto.getPrice());
            product.setQuantity(productDto.getQuantity());
            product.setStatus(productDto.getStatus());
            product.setBarCode(productDto.getBarCode());
            productRepository.save(product);
        } else {
            log.info("product not exist");
        }
        return product;
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

}
