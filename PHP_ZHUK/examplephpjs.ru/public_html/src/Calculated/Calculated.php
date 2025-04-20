<?php
// calculated.php

class CalculatedItem {
    public function calculateCost($length, $width, $month) {
        return $length * $width * $month; // формула может быть изменена по необходимости
    }
}