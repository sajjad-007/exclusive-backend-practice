const emailTemplate = (firstName,Otp) => {
    return ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background-color: #007bff;
            color: #fff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            font-weight: bold;
        }
        .email-body {
            padding: 20px;
            line-height: 1.6;
        }
        .otp-box {
            display: inline-block;
            background-color: #f8f9fa;
            color: #007bff;
            font-size: 24px;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .email-footer {
            text-align: center;
            font-size: 14px;
            color: #777;
            padding: 20px;
            border-top: 1px solid #ddd;
        }
        .email-footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            Verification Code
        </div>
        <div class="email-body">
            <p>Hi <strong>${firstName}</strong>,</p>
            <p>Thank you for using our service. Please use the following OTP to complete your verification:</p>
            <div class="otp-box">${Otp}</div>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br>The Team</p>
        </div>
        <div class="email-footer">
            © 2024 Company Name. All rights reserved. 
            <br><a href="#">Privacy Policy</a> | <a href="#">Contact Us</a>
        </div>
    </div>
</body>
</html>
 `
}

module.exports = {emailTemplate} 