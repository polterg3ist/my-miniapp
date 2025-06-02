const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const tg = window.Telegram.WebApp;
        const userCountry = ref(null);
        const userClicks = ref(0);
        const countryScores = ref({ Russia: 0, Ukraine: 0 });

        // Проверка подключения Firebase
        onMounted(() => {
            console.log("Проверка подключения Firebase...");

            firebase.database().ref('.info/connected').on('value', (snapshot) => {
                if (snapshot.val() === true) {
                    console.log("Firebase подключён");
                    initDatabase();
                } else {
                    console.error("Нет подключения к Firebase");
                }
            });
        });

        // Инициализация базы данных
        const initDatabase = () => {
            const dbRef = firebase.database().ref('countryScores');

            dbRef.on('value', (snapshot) => {
                const data = snapshot.val();
                console.log("Данные из Firebase:", data);

                if (data) {
                    countryScores.value = {
                        Russia: data.Russia || 0,
                        Ukraine: data.Ukraine || 0
                    };
                } else {
                    // Создаём структуру при первом запуске
                    dbRef.set({ Russia: 0, Ukraine: 0 })
                        .then(() => console.log("База данных инициализирована"))
                        .catch(console.error);
                }
            });
        };

        // Выбор страны
        const selectCountry = (country) => {
            userCountry.value = country;
            tg.expand();
            console.log("Выбрана страна:", country);
        };

        // Обработка клика
        const addClick = () => {
            if (!userCountry.value) {
                console.warn("Страна не выбрана");
                return;
            }

            userClicks.value++;

            firebase.database().ref(`countryScores/${userCountry.value}`)
                .transaction((current) => {
                    return (current || 0) + 1;
                })
                .then(() => console.log("Счёт обновлён"))
                .catch((error) => {
                    console.error("Ошибка обновления:", error);
                    userClicks.value--; // Откат при ошибке
                });
        };

        return {
            userCountry,
            userClicks,
            countryScores,
            selectCountry,
            addClick
        };
    }
}).mount('#app');