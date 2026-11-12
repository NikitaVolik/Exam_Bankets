# О проекте

«Банкетам.Нет» — приложение для подачи и обработки заявок на бронирование банкетных помещений.

# База данных

Запусти MariaDB в Docker. Подключись через HeidiSQL и выполни по порядку sql/setup.sql, затем sql/optional-reviews.sql. Скрипты используют базу exam_bankets.

# Настройка окружения

Скопируй server/.env.example в server/.env. Заполни параметры подключения к MariaDB и JWT_SECRET. Для DB_PORT укажи порт Docker на хосте, по которому подключается HeidiSQL.

# Запуск

Сервер — из корня Exam_Bankets, после импорта SQL и настройки .env:

cd server

npm ci

npm run create-admin

npm run dev

Клиент — в новом терминале, тоже из корня Exam_Bankets:

cd client

npm ci

npm run dev

Открой адрес, который выведет Vite. Для входа администратора укажи экзаменационные реквизиты Admin26 / Demo20.

[ER-диаграмма](docs/er-diagram.md)

[Скриншоты](client/public/screenshots)