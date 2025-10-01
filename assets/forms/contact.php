<?php
$receiving_email_address = 'webrdevo@gmail.com';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name    = strip_tags(trim($_POST["name"]));
  $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $phone   = strip_tags(trim($_POST["phone"]));
  $subject = strip_tags(trim($_POST["subject"]));
  $message = strip_tags(trim($_POST["message"]));

  if (empty($name) || empty($email) || empty($phone) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Please fill out all fields correctly.";
    exit;
  }

  $email_subject = "New Contact Form Submission: $subject";
  $email_body = "
    <strong>Name:</strong> $name<br>
    <strong>Email:</strong> $email<br>
    <strong>Phone:</strong> $phone<br>
    <strong>Subject:</strong> $subject<br>
    <strong>Message:</strong><br>$message
  ";

  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/html; charset=UTF-8\r\n";
  $headers .= "From: $name <$email>\r\n";

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
