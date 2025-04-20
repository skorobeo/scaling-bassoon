<?php
require_once __DIR__  . '/../src/Calculated/Calculated.php';


$month = date('n'); // номер текущего месяца (1-12)

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $length = isset($_POST['length']) ? (float)$_POST['length'] : null;
    $width = isset($_POST['width']) ? (float)$_POST['width'] : null;

    if ($length === null || $width === null) {
        echo json_encode([
            'success' => false,
            'message' => 'Не передана длина или ширина'
        ]);
        exit;
    }

    // Используем класс для расчета стоимости
    $calculator = new CalculatedItem();
    $price = $calculator->calculateCost($length, $width, $month);

    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'length' => $length,
        'width' => $width,
        'price' => $price,
        'number_moth' => $month
    ]);
} 