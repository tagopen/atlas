<?php

if (is_file('lib/class.phpmailer.php')) {
    require_once("lib/class.phpmailer.php");
}

if (is_file('lib/class.smtp.php')) {
    require_once("lib/class.smtp.php");
}

$http_host = $_SERVER['HTTP_HOST'];

if (substr($http_host, 0, 4) == 'www.') {
    $host_name = substr($http_host, 4);
} else {
    $host_name = $http_host;
}

define('HTTP_SERVER', 'http://' . $http_host . '/');
define('HOST_NAME', $host_name);

$post = array(
    'host_name' => HOST_NAME,
    'host_dir' => HTTP_SERVER
);

$body = '';

if (!empty($_POST["form"])) {
    if (is_array($_POST["form"])) {
        foreach ($_POST["form"] as $key => $value) {
            $post['user_form'] = strip_tags($key);
            $body .= 'Заявка с формы: ' . $post['user_form'] . chr(10) . chr(13);
        }
    }
}

if (!empty($_POST["email"])) {
    $post['user_email'] = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $body .= 'Email адресс: ' . $post['user_email'] . chr(10) . chr(13);
}

if (!empty($_POST["name"])) {
    $post['user_name'] = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $body .= 'Имя: ' . $post['user_name'] . chr(10) . chr(13);
}

if (!empty($_POST["phone"])) {
    $post['user_phone'] = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $body .= 'Телефон: ' . $post['user_phone'] . chr(10) . chr(13);
}

if (!empty($_POST["message"])) {
    $post['user_message'] = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    $body .= 'Сообщение: ' . $post['user_message'] . chr(10) . chr(13);
}

if (!empty($_POST["question"])) {
    $post['user_speek'] = filter_input(INPUT_POST, 'question', FILTER_SANITIZE_STRING);
    $body .= 'Способ общения: ' . $post['user_speek'] . chr(10) . chr(13);
}

/*  if (!empty($_POST["question"])) {
foreach ($_POST["question"] as $key => $values) {
if (is_array($values)) {
foreach ($values as $value) {
$post[$key] = strip_tags($value);
$body .= $post[$key] . chr(10) . chr(13);
}
} else {
$post[$key] = strip_tags($values);
$body .= $post[$key] . chr(10) . chr(13);
}
}
}*/

$magnet = (($post['user_form'] == "Магнит - Хедер") || ($post['user_form'] == "Магнит - Узнайте 17 возможностей"));

if ($magnet || ($post['user_form'] == "ОТО страница")) {
    if (!empty($_COOKIE["personalID"])) {
        $post['user_id'] = filter_input(INPUT_COOKIE, 'personalID', FILTER_SANITIZE_STRING);
        $body .= 'Индентификатор пользователя: ' . $post['user_id'] . chr(10) . chr(13);
    } else {
        $post['user_id'] = uniqid('_');
        setcookie("personalID", $post['user_id'], time() + 60 * 5, "/");
        $body .= 'Индентификатор пользователя: ' . $post['user_id'] . chr(10) . chr(13);
    }
}

$mail = new PHPMailer();

$mail->CharSet = 'UTF-8';

$mail->IsSendmail();

$from = 'no-reply@atlas.plus';
$to = "boxpro17@gmail.com";
$mail->SetFrom($from, HOST_NAME);
$mail->AddAddress($to);

$mail->isHTML(false);

$mail->Subject = ($post['user_id']) ? "Заявка номер - " . $post['user_id'] : "Новая заявка";
$mail->Body    = $body;

/*header("Content-Type: text/html; charset=utf-8");
var_dump($post); exit;
*/
if (!$mail->send()) {
    echo 'Что-то пошло не так. ' . $mail->ErrorInfo;
    return false;
} else {
    echo 'Сообщение отправлено';
    if ($magnet) {
        header("Location: ../oto.html");
    } else {
        if (isset($_COOKIE['personalID'])) {
            unset($_COOKIE['personalID']);
            setcookie('personalID', '', time() - 3600, '/'); // empty value and old timestamp
        }
        header("Location: ../success.html");
        return true;
    }
}

?>