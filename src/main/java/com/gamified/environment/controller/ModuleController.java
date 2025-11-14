package com.gamified.environment.controller;

import com.gamified.environment.entity.Module;
import com.gamified.environment.repo.ModuleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/modules")
public class ModuleController {

    private final ModuleRepository moduleRepository;

    public ModuleController(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    // ============================
    // GET ALL MODULES
    // ============================
    @GetMapping
    public ResponseEntity<List<Module>> getAllModules() {
        return ResponseEntity.ok(moduleRepository.findAll());
    }

    // ============================
    // GET MODULE BY ID (FIXED)
    // ============================
    @GetMapping("/{id}")
    public ResponseEntity<?> getModuleById(@PathVariable Long id) {

        return moduleRepository.findById(id)
                .map(module -> ResponseEntity.ok((Object) module))
                .orElseGet(() -> ResponseEntity.badRequest().body("Module not found"));
    }

    // ============================
    // CREATE MODULE
    // ============================
    @PostMapping
    public ResponseEntity<?> createModule(@RequestBody Module module) {
        moduleRepository.save(module);
        return ResponseEntity.ok("Module created");
    }

    // ============================
    // DELETE MODULE
    // ============================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModule(@PathVariable Long id) {

        if (!moduleRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Module not found");
        }

        moduleRepository.deleteById(id);
        return ResponseEntity.ok("Module deleted");
    }
}
