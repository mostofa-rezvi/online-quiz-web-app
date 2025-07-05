package com.encapsulearn.OnlineQuiz_spring.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class DashboardDataDto {
    // For Admin
    private Long totalUsers;
    private Long totalQuizzes;
    private List<Map<String, Object>> userRoleDistribution; // e.g., [{name: "ADMIN", value: 5}, {name: "USER", value: 50}]

    // For User
    private List<QuizResultDto> recentResults;
    private Map<String, Double> averageScoreByCategory; // This is a placeholder for more advanced stats
}
