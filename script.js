// 1
const products = [
    { name: "Ноутбук", price: 80000, quantity: 3, category: "Электроника" },
    { name: "Мышь", price: 1500, quantity: 10, category: "Электроника" },
    { name: "Хлеб", price: 50, quantity: 100, category: "Продукты" },
    { name: "Молоко", price: 80, quantity: 50, category: "Продукты" },
    { name: "Кресло", price: 12000, quantity: 2, category: "Мебель" },
];

function getTotalValue(products) {
    return products.reduce((sum, p) => sum + p.price * p.quantity, 0);
}

function getByCategory(products, category) {
    return products
        .filter(p => p.category === category)
        .map(p => p.name);
}

function getMostExpensive(products) {
    return products.reduce((max, p) => (p.price > max.price ? p : max), products[0]);
}

function applyDiscount(products, category, percent) {
    return products.map(p => {
        if (p.category === category) {
            return { ...p, price: p.price * (1 - percent / 100) };
        }
        return { ...p };
    });
}

function groupByCategory(products) {
    const result = {};
    for (const p of products) {
        if (!result[p.category]) result[p.category] = [];
        result[p.category].push(p);
    }
    return result;
}

console.log("Задача 1");
console.log("Общая стоимость:", getTotalValue(products));
console.log("Электроника:", getByCategory(products, "Электроника"));
console.log("Самый дорогой:", getMostExpensive(products));
console.log("Скидка 10% на Продукты:", applyDiscount(products, "Продукты", 10));
console.log("Группировка:", groupByCategory(products));


// 2
const students = [
    { name: "Аня", grades: [5, 4, 5, 5] },
    { name: "Борис", grades: [3, 3, 2, 4] },
    { name: "Вика", grades: [5, 5, 5, 5] },
    { name: "Гена", grades: [2, 2, 3, 2] },
    { name: "Дима", grades: [4, 4, 4, 4] },
];

function getAverage(student) {
    if (student.grades.length === 0) return 0;
    return student.grades.reduce((s, g) => s + g, 0) / student.grades.length;
}

function getTopStudents(students, n) {
    return [...students]
        .sort((a, b) => getAverage(b) - getAverage(a))
        .slice(0, n);
}

function getFailing(students) {
    return students.filter(s => getAverage(s) < 3);
}

function addGrade(students, name, grade) {
    const student = students.find(s => s.name === name);
    if (student) student.grades.push(grade);
    return students;
}

function getSubjectStats(students) {
    const all = students.flatMap(s => s.grades);
    if (all.length === 0) return { min: 0, max: 0, avg: 0 };
    return {
        min: Math.min(...all),
        max: Math.max(...all),
        avg: all.reduce((s, g) => s + g, 0) / all.length,
    };
}

console.log("\n Задача 2");
console.log("Средний балл Ани:", getAverage(students[0]));
console.log("Топ-2:", getTopStudents(students, 2));
console.log("Двоечники:", getFailing(students));
addGrade(students, "Борис", 5);
console.log("Борис после addGrade:", students.find(s => s.name === "Борис"));
console.log("Статистика:", getSubjectStats(students));


// 3
const cart = [
    { id: 1, title: "Телефон", price: 30000, count: 1 },
    { id: 2, title: "Чехол", price: 500, count: 2 },
];

function addItem(cart, item) {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
        existing.count += item.count;
        return cart;
    }
    return [...cart, { ...item }];
}

function removeItem(cart, id) {
    return cart.filter(i => i.id !== id);
}

function updateCount(cart, id, count) {
    if (count === 0) return removeItem(cart, id);
    return cart.map(i => (i.id === id ? { ...i, count } : i));
}

function getCartTotal(cart) {
    const total = cart.reduce((s, i) => s + i.price * i.count, 0);
    return total > 5000 ? total * 0.9 : total;
}

function getCheapestItem(cart) {
    return cart.reduce((min, i) => (i.price < min.price ? i : min), cart[0]);
}

console.log("\nЗадача 3");
let cart2 = addItem(cart, { id: 1, title: "Телефон", price: 30000, count: 1 });
console.log("После addItem:", cart2);
cart2 = addItem(cart2, { id: 3, title: "Зарядка", price: 1500, count: 1 });
console.log("После addItem нового:", cart2);
console.log("Итого (со скидкой):", getCartTotal(cart2));
console.log("Самый дешёвый:", getCheapestItem(cart2));
cart2 = updateCount(cart2, 2, 0);
console.log("После updateCount(2, 0):", cart2);


// 4
const phoneBook = {
    "Аня": ["+7-900-111-11-11", "+7-900-222-22-22"],
    "Борис": ["+7-900-333-33-33"],
};

function addContact(phoneBook, name, phone) {
    const copy = { ...phoneBook };
    if (!copy[name]) copy[name] = [];
    if (!copy[name].includes(phone)) copy[name].push(phone);
    return copy;
}

function findByName(phoneBook, query) {
    const q = query.toLowerCase();
    return Object.keys(phoneBook).filter(name => name.toLowerCase().includes(q));
}

function removePhone(phoneBook, name, phone) {
    const copy = { ...phoneBook };
    if (!copy[name]) return copy;
    copy[name] = copy[name].filter(p => p !== phone);
    if (copy[name].length === 0) delete copy[name];
    return copy;
}

function getAllPhones(phoneBook) {
    return Object.values(phoneBook).flat();
}

function invert(phoneBook) {
    const result = {};
    for (const [name, phones] of Object.entries(phoneBook)) {
        for (const phone of phones) {
            result[phone] = name;
        }
    }
    return result;
}

console.log("\n Задача 4");
let pb = addContact(phoneBook, "Вика", "+7-900-444-44-44");
console.log("После addContact:", pb);
console.log("Поиск 'ан':", findByName(pb, "ан"));
pb = removePhone(pb, "Аня", "+7-900-111-11-11");
console.log("После removePhone:", pb);
console.log("Все номера:", getAllPhones(pb));
console.log("Инверсия:", invert(pb));


// 5
const text = "Привет мир привет JavaScript мир привет";

function countWords(str) {
    const words = str.toLowerCase().split(/\s+/).filter(Boolean);
    const result = {};
    for (const w of words) {
        result[w] = (result[w] || 0) + 1;
    }
    return result;
}

function getMostFrequent(str) {
    const counts = countWords(str);
    let maxWord = null;
    let maxCount = 0;
    for (const [word, count] of Object.entries(counts)) {
        if (count > maxCount) {
            maxCount = count;
            maxWord = word;
        }
    }
    return maxWord;
}

function getUniqueWords(str) {
    const counts = countWords(str);
    return Object.keys(counts).filter(w => counts[w] === 1);
}

function sortByFrequency(str) {
    const counts = countWords(str);
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
}

function getLongestWord(str) {
    const words = str.split(/\s+/).filter(Boolean);
    return words.reduce((longest, w) => (w.length > longest.length ? w : longest), "");
}

console.log("\nЗадача 5");
console.log("Частоты:", countWords(text));
console.log("Самое частое:", getMostFrequent(text));
console.log("Уникальные:", getUniqueWords(text));
console.log("По частоте:", sortByFrequency(text));
console.log("Самое длинное:", getLongestWord(text));


// 6
const schedule = {
    monday: [
        { subject: "Математика", teacher: "Иванов", room: 101 },
        { subject: "Физика", teacher: "Петров", room: 202 },
    ],
    tuesday: [
        { subject: "Математика", teacher: "Иванов", room: 101 },
        { subject: "Химия", teacher: "Сидоров", room: 303 },
        { subject: "История", teacher: "Петров", room: 204 },
    ],
    wednesday: [
        { subject: "Физика", teacher: "Петров", room: 202 },
    ],
};

function getSubjectsByTeacher(schedule, teacher) {
    const result = [];
    for (const day of Object.values(schedule)) {
        for (const lesson of day) {
            if (lesson.teacher === teacher) result.push(lesson.subject);
        }
    }
    return result;
}

function findLesson(schedule, subject) {
    for (const [day, lessons] of Object.entries(schedule)) {
        const idx = lessons.findIndex(l => l.subject === subject);
        if (idx !== -1) {
            return { day, time: idx, room: lessons[idx].room };
        }
    }
    return null;
}

function countLessonsPerDay(schedule) {
    const result = {};
    for (const [day, lessons] of Object.entries(schedule)) {
        result[day] = lessons.length;
    }
    return result;
}

function getTeachersLoad(schedule) {
    const result = {};
    for (const day of Object.values(schedule)) {
        for (const lesson of day) {
            result[lesson.teacher] = (result[lesson.teacher] || 0) + 1;
        }
    }
    return result;
}

function swapDays(schedule, day1, day2) {
    const copy = { ...schedule };
    const temp = copy[day1];
    copy[day1] = copy[day2];
    copy[day2] = temp;
    return copy;
}

console.log("\n Задача 6");
console.log("Предметы Иванова:", getSubjectsByTeacher(schedule, "Иванов"));
console.log("Поиск 'Физика':", findLesson(schedule, "Физика"));
console.log("Занятий по дням:", countLessonsPerDay(schedule));
console.log("Нагрузка преподавателей:", getTeachersLoad(schedule));
console.log("Swap monday/tuesday:", swapDays(schedule, "monday", "tuesday"));


// 7
const books = [
    { title: "Война и мир", author: "Толстой", year: 1869, genres: ["роман", "история"] },
    { title: "Анна Каренина", author: "Толстой", year: 1877, genres: ["роман"] },
    { title: "Мастер и Маргарита", author: "Булгаков", year: 1967, genres: ["роман", "мистика"] },
    { title: "Преступление и наказание", author: "Достоевский", year: 1866, genres: ["роман", "психология"] },
    { title: "1984", author: "Оруэлл", year: 1949, genres: ["антиутопия", "роман"] },
];

function findByAuthor(books, author) {
    return books.filter(b => b.author === author);
}

function getBooksAfterYear(books, year) {
    return books.filter(b => b.year > year);
}

function getAllGenres(books) {
    return [...new Set(books.flatMap(b => b.genres))];
}

function groupByDecade(books) {
    const result = {};
    for (const b of books) {
        const decade = Math.floor(b.year / 10) * 10 + "s";
        if (!result[decade]) result[decade] = [];
        result[decade].push(b);
    }
    return result;
}

function search(books, query) {
    const q = query.toLowerCase();
    return books.filter(
        b =>
            b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q)
    );
}

console.log("\nЗадача 7");
console.log("Книги Толстого:", findByAuthor(books, "Толстой"));
console.log("После 1900:", getBooksAfterYear(books, 1900));
console.log("Все жанры:", getAllGenres(books));
console.log("По десятилетиям:", groupByDecade(books));
console.log("Поиск 'роман':", search(books, "роман"));

// 8
const accounts = [
    {
        owner: "Аня",
        balance: 1000,
        transactions: [
            { type: "in", amount: 500 },
            { type: "out", amount: 200 },
        ],
    },
    {
        owner: "Борис",
        balance: 500,
        transactions: [
            { type: "out", amount: 700 },
            { type: "out", amount: 300 },
        ],
    },
    {
        owner: "Вика",
        balance: 10000,
        transactions: [
            { type: "in", amount: 2000 },
            { type: "out", amount: 1500 },
        ],
    },
];

function getBalance(account) {
    return account.transactions.reduce((bal, t) => {
        return t.type === "in" ? bal + t.amount : bal - t.amount;
    }, account.balance);
}

function getRichest(accounts) {
    return accounts.reduce(
        (richest, acc) => (getBalance(acc) > getBalance(richest) ? acc : richest),
        accounts[0]
    ).owner;
}

function getTotalTurnover(accounts) {
    return accounts.reduce(
        (sum, acc) => sum + acc.transactions.reduce((s, t) => s + t.amount, 0),
        0
    );
}

function getNegativeAccounts(accounts) {
    return accounts.filter(acc => getBalance(acc) < 0);
}

function getTopSpenders(accounts, n) {
    return [...accounts]
        .map(acc => ({
            owner: acc.owner,
            spent: acc.transactions
                .filter(t => t.type === "out")
                .reduce((s, t) => s + t.amount, 0),
        }))
        .sort((a, b) => b.spent - a.spent)
        .slice(0, n)
        .map(x => x.owner);
}

console.log("\nЗадача 8");
console.log("Баланс Ани:", getBalance(accounts[0]));
console.log("Самый богатый:", getRichest(accounts));
console.log("Общий оборот:", getTotalTurnover(accounts));
console.log("Отрицательные:", getNegativeAccounts(accounts));
console.log("Топ-2 тратящих:", getTopSpenders(accounts, 2));


// 9
const characters = [
    {
        name: "Воин",
        level: 10,
        hp: 200,
        inventory: [
            { item: "Меч", weight: 5 },
            { item: "Щит", weight: 8 },
        ],
    },
    {
        name: "Маг",
        level: 12,
        hp: 120,
        inventory: [
            { item: "Посох", weight: 3 },
            { item: "Зелье", weight: 1 },
        ],
    },
    {
        name: "Лучник",
        level: 10,
        hp: 250,
        inventory: [
            { item: "Лук", weight: 2 },
            { item: "Стрелы", weight: 4 },
        ],
    },
];

function getTotalWeight(character) {
    return character.inventory.reduce((s, i) => s + i.weight, 0);
}

function levelUp(character) {
    return { ...character, level: character.level + 1, hp: character.hp + 20 };
}

function getStrongest(characters) {
    return characters.reduce((best, c) => {
        if (c.level > best.level) return c;
        if (c.level === best.level && c.hp > best.hp) return c;
        return best;
    }, characters[0]);
}

function findItem(characters, itemName) {
    return characters
        .filter(c => c.inventory.some(i => i.item === itemName))
        .map(c => c.name);
}

function sortByPower(characters) {
    return [...characters].sort((a, b) => b.level * b.hp - a.level * a.hp);
}

console.log("\n Задача 9");
console.log("Вес Воина:", getTotalWeight(characters[0]));
console.log("LevelUp Мага:", levelUp(characters[1]));
console.log("Сильнейший:", getStrongest(characters).name);
console.log("У кого 'Меч':", findItem(characters, "Меч"));
console.log("По силе:", sortByPower(characters).map(c => c.name));


// 10
const films = [
    {
        title: "Фильм A",
        year: 1994,
        rating: 9.2,
        actors: ["Актер1", "Актер2"],
        director: "Режиссер1",
    },
    {
        title: "Фильм B",
        year: 1999,
        rating: 8.7,
        actors: ["Актер2", "Актер3"],
        director: "Режиссер1",
    },
    {
        title: "Фильм C",
        year: 2005,
        rating: 7.5,
        actors: ["Актер1", "Актер3"],
        director: "Режиссер2",
    },
    {
        title: "Фильм D",
        year: 1985,
        rating: 8.9,
        actors: ["Актер4"],
        director: "Режиссер3",
    },
];

function getTopRated(films, n) {
    return [...films].sort((a, b) => b.rating - a.rating).slice(0, n);
}

function getFilmsByActor(films, actor) {
    return films.filter(f => f.actors.includes(actor));
}

function getDirectorsStats(films) {
    const result = {};
    for (const f of films) {
        if (!result[f.director]) {
            result[f.director] = { count: 0, avgRating: 0 };
        }
        result[f.director].count++;
        result[f.director].avgRating += f.rating;
    }
    for (const d of Object.keys(result)) {
        result[d].avgRating /= result[d].count;
    }
    return result;
}

function getCommonActors(films, title1, title2) {
    const f1 = films.find(f => f.title === title1);
    const f2 = films.find(f => f.title === title2);
    if (!f1 || !f2) return [];
    return f1.actors.filter(a => f2.actors.includes(a));
}

function getTimeline(films) {
    const result = {};
    for (const f of films) {
        const decade = Math.floor(f.year / 10) * 10 + "s";
        if (!result[decade]) result[decade] = [];
        result[decade].push(f.title);
    }
    // сортировка по десятилетиям
    const sorted = {};
    Object.keys(result)
        .sort()
        .forEach(k => (sorted[k] = result[k]));
    return sorted;
}

console.log("\nЗадача 10 ");
console.log("Топ-2:", getTopRated(films, 2).map(f => f.title));
console.log("С Актер2:", getFilmsByActor(films, "Актер2").map(f => f.title));
console.log("Статистика режиссёров:", getDirectorsStats(films));
console.log("Общие актеры A и B:", getCommonActors(films, "Фильм A", "Фильм B"));
console.log("Timeline:", getTimeline(films));