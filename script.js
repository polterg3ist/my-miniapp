const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const tg = window.Telegram.WebApp;
        const userCountry = ref(null);
        const userClicks = ref(0);
        const countryScores = ref({ USA: 0, Russia: 0, Germany: 0 });

        // Загрузка данных из Firebase
        onMounted(() => {
            database.ref('countryScores').on('value', (snapshot) => {
                countryScores.value = snapshot.val() || { USA: 0, Russia: 0, Germany: 0 };
            });
        });

        // Выбор страны
        const selectCountry = (country) => {
            userCountry.value = country;
            tg.sendData(JSON.stringify({ action: "set_country", country }));
        };

        // Клик + отправка в Firebase
        const incrementClick = () => {
            userClicks.value++;
            const updates = {};
            updates[`countryScores/${userCountry.value}`] = countryScores.value[userCountry.value] + 1;
            database.ref().update(updates);
        };

        return { userCountry, userClicks, countryScores, selectCountry, incrementClick };
    }
}).mount('#app');