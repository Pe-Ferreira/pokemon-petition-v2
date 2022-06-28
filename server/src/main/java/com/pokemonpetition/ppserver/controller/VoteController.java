package com.pokemonpetition.ppserver.controller;

import com.pokemonpetition.ppserver.domain.Vote;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("vote")
@CrossOrigin(origins = "http://localhost:3000")
public class VoteController {

    private final String FIREBASE_RESOURCE_URL = "https://pokemon-petition-default-rtdb.firebaseio.com/votes/.json";
    private final RestTemplate restTemplate;

    public VoteController(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @PostMapping
    public ResponseEntity<String> vote(@RequestBody Vote vote) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        Map<String, Object> map = new HashMap<>();
        map.put("country", vote.getCountry());
        map.put("name", vote.getName());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, headers);

        String response = this.restTemplate.postForObject(FIREBASE_RESOURCE_URL, entity, String.class);
        System.out.println(response);
        return ResponseEntity.status(HttpStatus.CREATED).body("Boa filho");
    }
}
