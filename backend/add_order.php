<?php
    include 'db.php';

    // Get order details from POST request
    $orderDetails = json_decode(file_get_contents('php://input'), true);

    session_start();

    /* $user = $_SESSION['username'];
    $sql1 = "SELECT * FROM users WHERE username = '$user'";
    $result = $con->query($sql1);
    while($row = $result->fetch_assoc()) {
        $id = $row['id'];
    } */

    // Insert order details into database
    $date = date('Y-m-d');
    foreach ($orderDetails as $order) {
       
        $unit_price = $order['price'];
        $quantity = $order['quantity'];
        $subtotalAmount = $order['subtotal_amount'];
        $invoiceNumber = $order['invoice_number'];
        $sql = "INSERT INTO orders (unit_price, quantity, subtotal_amount, date) VALUES ('$unit_price', '$quantity', '$subtotalAmount', '$date')";
        if ($con->query($sql) !== TRUE) {
            echo "Error: " . $sql . "<br>" . $con->mysqli_error();
        }
    }

    // Close database connection
    $con->close();
?> 