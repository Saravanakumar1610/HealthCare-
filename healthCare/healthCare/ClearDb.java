import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class ClearDb {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/healthcare";
        
        try (Connection conn = DriverManager.getConnection(url, "postgres", "postgres");
             Statement stmt = conn.createStatement()) {
            
            stmt.executeUpdate("TRUNCATE TABLE users, patients, doctors, appointments RESTART IDENTITY CASCADE;");
            System.out.println("DATABASE CLEARED SUCCESSFULLY.");
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
