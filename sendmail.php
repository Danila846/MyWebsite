<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language');
	$mail->IsHTML(true);

	//From
	$mail->setForm('site846@fls.guru', 'From my site');
	//To
	$mail->addAddress('Danilam846@gmail.com');
	//Theme
	$mail->Subject = 'New message from my site';

	//Body
	$body = '<h1>Letter from your site</h1>';

	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['number']))){
		$body.='<p><strong>Number:</strong> '.$_POST['number'].'</p>';
	}
	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Message:</strong> '.$_POST['message'].'</p>';
	}

	//attach file
	if(!empty($_FILES['image']['tmp_name'])) {
		$filePath = __DIR__ . '/files/' . $_FILES['image']['name'];
		if(copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Image in app</strong></p>';
			$mail->addAttachment($fileAttach);
		}
	}

	$mail->Body = $body;

	//SEND
	if(!$mail->send()) {
		$message = 'Error';
	} else {
		$message = 'Data sent!';
	}

	$response = ['message' => $message];

	header('content-type: application/json');
	echo json_encode($response);
?>




