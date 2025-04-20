<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <title>Форма расчета</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>

<body>
    <form id="jsform" method="POST">
        <div class="input-wrapper">
            <label class="form-label">Длина товара (см)</label>
            <input type="text" pattern="^[0-9]+$" oninput="this.setCustomValidity('')"
                oninvalid="this.setCustomValidity('Не допускаются иные символы кроме цифр')" name="length"
                class="form-control" required>
        </div>
        <div class="input-wrapper">
            <label class="form-label">Ширина товара (см)</label>
            <input type="text" pattern="^[0-9]+$" oninput="this.setCustomValidity('')"
                oninvalid="this.setCustomValidity('Не допускаются иные символы кроме цифр')" name="width"
                class="form-control" required>
            <button type="submit" name="submit" class="button">Добавить в корзину</button>
        </div>
        <div class="input-wrapper">
            <h4>Стоимость товара: <span id="current-price">0 руб.</span></h4>
        </div>
    </form>
    <h2 class="total-costs">Список товаров</h2>
    <div>
        <table class="table table-bordered border ">
            <thead class="table-light"></thead>
            <tbody>
                <tr>
                    <td>Товар <?php echo($ЦЕНА)?></td>
                    <td>Стоимость товара</td>
                    <td>Действие</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h3 class="total-cost">Итоговая стоимость: <span id="total-cost">0</span></h3>

    <script src="index.js"></script>
</body>

</html>