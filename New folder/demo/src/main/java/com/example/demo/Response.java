package  com.example.demo;

import java.time.LocalDateTime;

public class Response {
    private LocalDateTime requestDateTime;
    private String username;
    private String password;

    // Constructors, Getters, and Setters
    public Response(LocalDateTime requestDateTime, String username, String password) {
        this.requestDateTime = requestDateTime;
        this.username = username;
        this.password = password;
    }

    public LocalDateTime getRequestDateTime() {
        return requestDateTime;
    }

    public void setRequestDateTime(LocalDateTime requestDateTime) {
        this.requestDateTime = requestDateTime;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}