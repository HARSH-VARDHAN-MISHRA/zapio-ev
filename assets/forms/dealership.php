<?php
$receiving_email_address = 'alphatechrides@gmail.com';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $company_name = strip_tags(trim($_POST["company_name"]));
  $full_name    = strip_tags(trim($_POST["full_name"]));
  $phone        = strip_tags(trim($_POST["phone"]));
  $email        = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $city         = strip_tags(trim($_POST["city"]));
  $space        = strip_tags(trim($_POST["space"]));
  $business_status = strip_tags(trim($_POST["business_status"]));
  $investment   = strip_tags(trim($_POST["investment"]));
  $background   = strip_tags(trim($_POST["background"]));

  if (
    empty($company_name) || empty($full_name) || empty($phone) || empty($email) ||
    empty($city) || empty($space) || empty($business_status) || empty($investment) || empty($background) ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)
  ) {
    http_response_code(400);
    echo "Please fill out all fields correctly.";
    exit;
  }

  $email_subject = "New Dealership Application";
  $email_body = "
    <strong>Company Name:</strong> $company_name<br>
    <strong>Full Name:</strong> $full_name<br>
    <strong>Phone:</strong> $phone<br>
    <strong>Email:</strong> $email<br>
    <strong>City:</strong> $city<br>
    <strong>Space:</strong> $space<br>
    <strong>Business Status:</strong> $business_status<br>
    <strong>Investment:</strong> $investment<br>
    <strong>Background:</strong><br>$background
  ";

  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/html; charset=UTF-8\r\n";
  $headers .= "From: $full_name <$email>\r\n";

  if (mail($receiving_email_address, $email_subject, $email_body, $headers)) {
    echo "OK";
  } else {
    http_response_code(500);
    echo "Failed to send email.";
  }
} else {
  http_response_code(403);
  echo "Invalid request.";
}

