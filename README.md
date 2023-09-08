# Google-Books-UI

Небольшое веб-приложение по поиску и сортировке книг через Google Books API. В приложении используется React/Redux~RTK, и как единственная дополнительная библиотека для рутинга - react-router. Тестирование проводилось с помощью jest

# Запуск приложения

Это приложение использует docker, так что всё что нужно это запустить файл docker-compose.yml и после окончания сборки зайти по адресу http://localhost:3000/. 

Если не использовать docker-compose то можно приложение собрать другим путем:

1 - Создать образ docker build -t react-books-image .

2 - Создать контейнер через эту команду docker run -it -e WATCHPACK_POLLING=true -v C:\Code\google-books-ui\google-books-app\src:/app/src:ro -d -p 3000:3000 --name react-books-app react-books-image


В противных случаях можно просто написать npm install и приложение запуститься без докера.

# Скриншоты работы приложения:

1 - Главная страница (сортировка по музыке)

![image](https://github.com/Pixerell/Google-Books-UI/assets/90747184/db717dea-146e-4ba8-870f-187055fd1e30)

1.5 - Пагинация (с поисковым запросом javascript)

![image](https://github.com/Pixerell/Google-Books-UI/assets/90747184/0da64525-01d2-42d5-a21c-ba8a19773b43)

2 - Страница с выбранной книгой 

![image](https://github.com/Pixerell/Google-Books-UI/assets/90747184/1820cdd8-0b3a-47f9-a186-29f18f54f9f1)
