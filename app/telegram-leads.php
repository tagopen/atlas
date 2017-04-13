<?php
header( 'Content-Type: text/html; charset=utf-8' );
$secret_code = 'bdf4b847c427a43864a807ffc804bb28'; //секретный ключ

$parrams = array(
	'secret_code' => $secret_code,
	'phone_number' => $_POST['phone_number'],
	'name' => $_POST['name'],
	'email' => $_POST['email'],
	'form' => $_POST['form'],
	'param1' => $_POST['param1'],
	'param2' => $_POST['param2'],
	'user_time' => $_POST['user_time']
);

$myCurl = curl_init();
curl_setopt_array($myCurl, array(
	CURLOPT_URL => 'https://leads-telegram.ru/new_lead.php',
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_POST => true,
	CURLOPT_POSTFIELDS => http_build_query($parrams)
));
$response = curl_exec($myCurl);
curl_close($myCurl);
?>