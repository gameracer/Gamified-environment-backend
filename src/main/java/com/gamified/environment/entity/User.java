package com.gamified.environment.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password; // hashed

    private String displayName;

    @Builder.Default
    private long xp = 0;

    @Builder.Default
    private int level = 1;

    @Builder.Default
    private int streak = 0;

    @Builder.Default
    private int gems = 0;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

    @Builder.Default
    private String avatar = "avatar1";

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_badges", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "badge_id"))
    private Set<Badge> badges = new HashSet<>();
}
