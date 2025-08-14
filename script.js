document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('mainContent');
    const audio = document.getElementById('bgMusic');
    audio.volume = 0.5;

    // Обработчик клика по прелоадеру
    preloader.addEventListener('click', function() {
        // Плавное исчезновение прелоадера
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        
        // Плавное появление основного контента
        setTimeout(() => {
            mainContent.classList.remove('hidden');
            preloader.style.display = 'none';
            
            // Пытаемся запустить аудио
            audio.play().catch(e => {
                console.log("Автовоспроизведение заблокировано");
                // Если не получилось, ждём следующего клика
                document.addEventListener('click', function enableAudio() {
                    audio.play();
                    document.removeEventListener('click', enableAudio);
                }, { once: true });
            });
        }, 500);
    });

    // Для мобильных устройств
    preloader.addEventListener('touchstart', function() {
        this.click();
    });
});