<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2D1B6B;
            color: #ffffff;
            padding: 10px 20px;
            text-align: center;
        }
        .content {
            margin: 20px 0;
            line-height: 1.6;
        }
        .footer {
            background-color: #2D1B6B;
            color: #ffffff;
            text-align: center;
            padding: 10px 20px;
            margin-top: 20px;
        }
        .button {
            background-color: #2D1B6B;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
        }
        @media (max-width: 600px) {
            .container {
                width: 100%;
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Atur Ulang Kata Sandi Anda</h1>
        </div>
        <div class="content">
            <p>Halo {{ $nama }},</p>
            <p>Kami menerima permintaan untuk mengatur ulang kata sandi Anda. Klik tombol dibawah ini untuk reset kata sandi anda:</p>
            <p ><a href="http://sipeminjam.indonesiadigitalsolutions.com/reset-password/{{$email}}/token/{{$token}}" class="button">Reset Password</a></p>
            <p>Jika Anda tidak meminta pengaturan ulang kata sandi, abaikan email ini.</p>
            <p>Jika Anda memiliki pertanyaan, silahkan balas email ini. Kami di sini untuk membantu!</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Mirza & Rafly. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
