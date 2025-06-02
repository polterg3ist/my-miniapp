const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const tg = window.Telegram.WebApp;
        const userCountry = ref(null);
        const userClicks = ref(0);
        const countryScores = ref({ Russia: 0, Ukraine: 0 }); // Инициализация счётчиков

        // Подписка на изменения в Firebase
        onMounted(() => {
            const dbRef = firebase.database().ref('countryScores');

            dbRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Обновляем локальные данные при изменении в Firebase
                    countryScores.value = {
                        Russia: data.Russia || 0,
                        Ukraine: data.Ukraine || 0
                    };
                }
            });
        });

        // Выбор страны
        const selectCountry = (country) => {
            userCountry.value = country;
            tg.expand();
        };

        // Обработка клика
        const addClick = () => {
            if (!userCountry.value) return;

            userClicks.value++;

            // Обновляем данные в Firebase
            const updates = {};
            updates[`countryScores/${userCountry.value}`] = (countryScores.value[userCountry.value] || 0) + 1;

            firebase.database().ref().update(updates)
                .then(() => console.log("Данные обновлены!"))
                .catch((error) => console.error("Ошибка:", error));
        };

        return { userCountry, userClicks, countryScores, selectCountry, addClick };
    }
}).mount('#app');