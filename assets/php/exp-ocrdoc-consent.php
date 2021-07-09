<?php

include './php-lib.php';
$response = array(
    'status' => 0,
    'message' => 'Form submission failed, please try again',
    'cookie' => '',
    'cookie_count' => count($_COOKIE),
);


if (isset($_POST['name']) || isset($_POST['company']) || isset($_POST['email'])) {
    $name = $_POST['name'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    $cookie_value = $name.';'.$company.';'.$email;

    $sql = "
        INSERT INTO api_test
        (name, company, email, tel, flag)
        VALUES(
            '{$name}',
            '{$company}',
            '{$email}',
            '',
            1
        )";

    $result = Query($sql);
    if ($result) {
        $response['status'] = 1;
        $response['message'] = 'Form data submitted successfully!';
    }
    // check cookie [1 day duration cookie]
    if (!isset($_COOKIE['newusebocr'])) {
        setcookie('newusebocr', $cookie_value, time() + (86400 * 30), '/');
        $response['cookie'] = 'newusebocr'.';'.$_COOKIE['newusebocr'].'is set';
    } else {
        $response['cookie'] = 'cookie is already set';
    }
} else {
    $response['message'] = '필수 입력 값들을 입력해주세요!';
}

echo json_encode($response);

?>
