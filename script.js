const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const tg = window.Telegram.WebApp;
        const userCountry = ref(null);
        const userClicks = ref(0);
        const countryScores = ref({ Russia: 0, Ukraine: 0 });

        // Загрузка данных из Firebase
        onMounted(() => {
            database.ref('countryScores').on('value', (snapshot) => {
                const data = snapshot.val() || { Russia: 0, Ukraine: 0 };
                countryScores.value = data;
            });
        });

        // Выбор страны
        const selectCountry = (country) => {
            userCountry.value = country;
            tg.sendData(JSON.stringify({ action: "set_country", country }));
            tg.expand(); // Развернуть на весь экран
        };

        // Клик + обновление Firebase
        const addClick = () => {
            userClicks.value++;
            const updates = {};
            updates[`countryScores/${userCountry.value}`] = (countryScores.value[userCountry.value] || 0) + 1;
            firebase.database().ref().update(updates);
            // Проверка подключения
            firebase.database().ref('.info/connected').on('value', (snapshot) => {
              console.log("Firebase connected:", snapshot.val());
});
        };

        return { userCountry, userClicks, countryScores, selectCountry, addClick };
    }
}).mount('#app');


