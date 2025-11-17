# Инструкция по публикации презентации на GitHub Pages

## Шаг 1: Создание репозитория на GitHub

1. Перейдите на [GitHub.com](https://github.com) и войдите в свой аккаунт
2. Нажмите кнопку **"New"** или **"+"** в правом верхнем углу → **"New repository"**
3. Заполните форму:
   - **Repository name**: `visual-recognition-presentation` (или любое другое имя)
   - **Description**: "Interactive presentation for automated nut classification system"
   - Выберите **Public** (для бесплатного GitHub Pages)
   - **НЕ** ставьте галочки на "Initialize with README" (у нас уже есть файлы)
4. Нажмите **"Create repository"**

## Шаг 2: Подключение локального репозитория к GitHub

После создания репозитория GitHub покажет вам команды. Выполните их в терминале:

```bash
cd "/Users/mikitavalkunovich/Desktop/Cursor/CV Demo/visual-recognition-presentation"

# Добавьте remote репозиторий (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/visual-recognition-presentation.git

# Или если используете SSH:
# git remote add origin git@github.com:YOUR_USERNAME/visual-recognition-presentation.git

# Отправьте код на GitHub
git branch -M main
git push -u origin main
```

## Шаг 3: Включение GitHub Pages

1. Перейдите в ваш репозиторий на GitHub
2. Нажмите на вкладку **"Settings"** (вверху репозитория)
3. В левом меню найдите раздел **"Pages"** (в секции "Code and automation")
4. В разделе **"Source"** выберите:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Нажмите **"Save"**

## Шаг 4: Ожидание публикации

GitHub Pages обычно публикует сайт в течение 1-2 минут. Вы увидите сообщение:
> "Your site is live at https://YOUR_USERNAME.github.io/visual-recognition-presentation/"

## Шаг 5: Доступ к сайту

После публикации ваш сайт будет доступен по адресу:
```
https://YOUR_USERNAME.github.io/visual-recognition-presentation/
```

Замените `YOUR_USERNAME` на ваш GitHub username.

## Обновление сайта

Каждый раз, когда вы вносите изменения и хотите обновить сайт:

```bash
git add .
git commit -m "Update presentation"
git push
```

Изменения появятся на сайте через 1-2 минуты после push.

## Важные замечания

⚠️ **Видео файлы**: GitHub Pages может иметь ограничения на размер файлов. Если `Demo.MOV` слишком большой (>100MB), GitHub может не принять его. В этом случае:
- Конвертируйте видео в более легкий формат (MP4, WebM)
- Или используйте внешний хостинг для видео (YouTube, Vimeo) и вставьте iframe

✅ **Все остальные файлы** (HTML, CSS, JS, изображения) работают отлично на GitHub Pages.

## Альтернативные варианты публикации

Если GitHub Pages не подходит, можно использовать:
- **Netlify** - перетащите папку на [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** - подключите GitHub репозиторий на [vercel.com](https://vercel.com)
- **GitHub Codespaces** - для разработки и предпросмотра

