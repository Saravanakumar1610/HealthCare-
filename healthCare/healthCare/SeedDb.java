import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class SeedDb {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/healthcare";
        
        try (Connection conn = DriverManager.getConnection(url, "postgres", "postgres");
             Statement stmt = conn.createStatement()) {
            
            // Billings (10 records)
            stmt.executeUpdate("INSERT INTO billings (patient_id, patient_name, appointment_id, amount, status, billing_date, payment_method) VALUES " +
                "(1, 'John Doe', 1, 150.0, 'PAID', NOW(), 'CREDIT_CARD'), " +
                "(2, 'Mary Jane', 2, 200.0, 'UNPAID', NOW(), 'CASH'), " +
                "(3, 'Robert Brown', 3, 75.0, 'PAID', NOW(), 'DEBIT_CARD'), " +
                "(4, 'Lisa White', 4, 120.0, 'UNPAID', NOW(), 'INSURANCE'), " +
                "(5, 'David Green', 5, 300.0, 'PAID', NOW(), 'ONLINE'), " +
                "(1, 'John Doe', 6, 50.0, 'PAID', NOW(), 'CASH'), " +
                "(2, 'Mary Jane', 7, 180.0, 'UNPAID', NOW(), 'CREDIT_CARD'), " +
                "(3, 'Robert Brown', 8, 90.0, 'PAID', NOW(), 'DEBIT_CARD'), " +
                "(4, 'Lisa White', 9, 210.0, 'UNPAID', NOW(), 'ONLINE'), " +
                "(5, 'David Green', 10, 500.0, 'PAID', NOW(), 'CREDIT_CARD')");
                
            // Medicines (10 records)
            stmt.executeUpdate("INSERT INTO medicines (name, manufacturer, price, stock_quantity, expiry_date) VALUES " +
                "('Paracetamol', 'GSK', 5.0, 500, '2027-12-31'), " +
                "('Amoxicillin', 'Pfizer', 12.5, 200, '2026-06-30'), " +
                "('Ibuprofen', 'Bayer', 8.0, 350, '2027-03-15'), " +
                "('Cetirizine', 'Cipla', 15.0, 150, '2026-11-20'), " +
                "('Metformin', 'Sun Pharma', 20.0, 400, '2028-01-10'), " +
                "('Atorvastatin', 'Pfizer', 45.0, 100, '2026-05-25'), " +
                "('Omeprazole', 'AstraZeneca', 18.0, 250, '2027-09-12'), " +
                "('Lisinopril', 'Novartis', 22.0, 180, '2026-08-05'), " +
                "('Azithromycin', 'Sandoz', 30.0, 120, '2027-02-14'), " +
                "('Amlodipine', 'Lupin', 10.0, 300, '2028-06-20')");
                
            System.out.println("BILLING AND PHARMACY DATA SEEDED SUCCESSFULLY (10 RECORDS EACH).");
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
