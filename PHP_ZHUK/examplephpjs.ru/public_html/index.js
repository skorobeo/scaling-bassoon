function sendData(event) {
  event.preventDefault(); // чтобы страница не перезагружалась

  let htmlform = document.getElementById("jsform");
  let data = new FormData(htmlform);

  fetch("/php/calculatedltem.php", {
    method: "POST",
    body: data,
  })
    .then(function (report) {
      return report.json();
    })
    .then(function (res) {
      console.log("Ответ от сервера:") + console.log(res); // тут покажется JSON

      if (res.success) {
        // Добавляем строку в таблицу
        let таблица = document.querySelector("tbody");
        let newString = document.createElement("tr");

        newString.innerHTML =
          "<td>Товар (" +
          res.length +
          " x " +
          res.width +
          ")</td>" +
          "<td class='стоимость'>" + // добавляем класс 'стоимость' для всех ячеек с ценой
          res.price +
          " руб.</td>" +
          "<td><button type='button' class='button удалить'>Удалить</button></td>";

        таблица.appendChild(newString);

        // 👉 Слушатель на кнопку удалить
        newString
          .querySelector(".удалить")
          .addEventListener("click", function () {
            таблица.removeChild(newString);
            updateTotalCost(); // Обновляем итоговую сумму после удаления
          });

        htmlform.reset(); // очищаем форму после отправки

        updateTotalCost(); // Обновляем итоговую сумму после добавления товара
      } else {
        alert("Ошибка: " + res.message);
      }
    })
    .catch(function (error) {
      console.log("Произошла ошибка:");
      console.log(error);
    });
}

// Функция для пересчета итоговой стоимости
function updateTotalCost() {
  let стоимости = document.querySelectorAll(".стоимость"); // Все ячейки с ценой товара
  let finalPrice = 0;

  // Суммируем все стоимости
  стоимости.forEach(function (item) {
    finalPrice += parseFloat(item.innerText); // Извлекаем стоимость из текста и добавляем к общей сумме
  });

  // Обновляем итоговую сумму на странице
  document.getElementById("total-cost").innerText =
    finalPrice.toFixed(2) + " руб.";
}

// Ждём пока всё загрузится
document.addEventListener("DOMContentLoaded", function () {
  let htmlform = document.getElementById("jsform");
  htmlform.addEventListener("submit", sendData);
});
// Функция для локального расчёта текущей цены перед отправкой
function calculateCurrentPrice() {
  const lengthInput = document.querySelector('input[name="length"]').value;
  const widthInput = document.querySelector('input[name="width"]').value;
  const length = parseInt(lengthInput, 10);
  const width = parseInt(widthInput, 10);

  // номер месяца (1–12)
  const month = new Date().getMonth() + 1;
  let price = 0;

  if (!isNaN(length) && !isNaN(width)) {
    price = length * width * month;
  }

  // Обновляем на форме
  document.getElementById("current-price").innerText =
    price.toFixed(2) + " руб.";
}

// Ждём загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("jsform");
  const lengthField = form.querySelector('input[name="length"]');
  const widthField = form.querySelector('input[name="width"]');

  // Слушатели для динамического расчёта
  lengthField.addEventListener("input", calculateCurrentPrice);
  widthField.addEventListener("input", calculateCurrentPrice);

  form.addEventListener("submit", sendData);
});
