<?php
// Start session
session_start();

// Database connection settings
$servername = "localhost";
$username = "root";  // Default XAMPP MySQL username
$password = "";      // Default XAMPP MySQL password (empty)
$dbname = "login_db";  // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // SQL query to fetch user based on the email
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch associated row
        $row = $result->fetch_assoc();
        
        // Verify password (assuming it's hashed in the database)
        if (password_verify($password, $row['password'])) {
            $_SESSION['user'] = $row['email'];  // Store user session
            
            // Redirect to home page
            header("Location: /login_project/FitnessFinal/home.html");  // Change 'home.php' to the actual home page of your main website
            exit(); // Terminate the script after the redirection
        } else {
            header("Location: /login_project/wrong.html"); 
        }
    } else {
        header("Location: /login_project/invalid.html"); 




        
    }

    $stmt->close();
}

$conn->close();
?>
