<?php

$ip = $_SERVER['REMOTE_ADDR'];
$referer = $_SERVER['HTTP_REFERER'];
$request = $_SERVER['REQUEST_URI'];

// echo $request;

switch ($request) {
    case '/':
        require __DIR__.'/app/home.html';
        break;
    case '':
        require __DIR__.'/app/home.html';
        break;

    // solution pages
    case '/solution':
    case '/solution/':
        header('Location: ./solution/ocr');
        break;
    case '/solution/ocr':
        require __DIR__.'/app/solution/ocr.html';
        break;
    case '/solution/ocrdoc':
        require __DIR__.'/app/solution/ocr-doc.html';
        break;
    case '/solution/1won':
        require __DIR__.'/app/solution/1won.html';
        break;
    case '/solution/face':
        require __DIR__.'/app/solution/face.html';
        break;
    case '/solution/realpass':
        require __DIR__.'/app/solution/realpass.html';
        break;
    case '/solution/aml':
        require __DIR__.'/app/solution/aml.html';
        break;

    // experience pages
    case '/experience':
    case '/experience/':
        header('Location: ./experience/ocr');
        break;
    case '/experience/ocr':
        require __DIR__.'/app/experience/exp-ocr.html';
        break;
    case '/experience/ocrdoc':
        require __DIR__.'/app/experience/exp-ocrdoc.html';
        break;
    case '/experience/1won':
        require __DIR__.'/app/experience/exp-1won.html';
        break;
    case '/experience/face':
        require __DIR__.'/app/experience/exp-face.html';
        break;
    case '/experience/realpass':
        require __DIR__.'/app/experience/exp-realpass.html';
        break;

    // company pages
    case '/company':
    case '/company/':
        header('Location: ./company/intro');
        break;
    case '/company/intro':
        require __DIR__.'/app/company/company-intro.html';
        break;
    case '/company/recruit':
        require __DIR__.'/app/company/recruit.html';
        break;

    // contact pages
    case '/contact':
    case '/contact/':
        header('Location: ./contact/loc');
        break;
    case '/contact/loc':
        require __DIR__.'/app/contact/loc.html';
        break;
    case '/contact/inquiry':
        require __DIR__.'/app/contact/inquiry.html';
        break;

    case '/admin':
        require __DIR__.'/adminboard/index.html';
        break;
}
