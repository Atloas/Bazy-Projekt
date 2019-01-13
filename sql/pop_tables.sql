INSERT INTO paliwo (nazwa) VALUES ('benzyna');
INSERT INTO paliwo (nazwa) VALUES ('diesel');


INSERT INTO marki (nazwa) VALUES ('Audi');
INSERT INTO marki (nazwa) VALUES ('Mercedes');
INSERT INTO marki (nazwa) VALUES ('Opel');
INSERT INTO marki (nazwa) VALUES ('Volkswagen');
INSERT INTO marki (nazwa) VALUES ('Renault');
INSERT INTO marki (nazwa) VALUES ('BMW');
INSERT INTO marki (nazwa) VALUES ('Mitsubishi');
INSERT INTO marki (nazwa) VALUES ('Mazda');
INSERT INTO marki (nazwa) VALUES ('Lexus');
INSERT INTO marki (nazwa) VALUES ('Ford');
INSERT INTO marki (nazwa) VALUES ('Fiat');


INSERT INTO salony (miasto, ulica) VALUES ('Kraków', 'Samochodowa 13');
INSERT INTO salony (miasto, ulica) VALUES ('Katowice', 'Węglowa 25');
INSERT INTO salony (miasto, ulica) VALUES ('Warszawa', 'im. Tadeusza Kościuszki 7');


INSERT INTO modele (marki_id, nazwa, moc, masa, paliwo_id, spalanie, rocznik, cena) VALUES (1, 'A4 B9 S4 AVANT', 354, 1.68, 1, 7.5, 2016, 310800);
INSERT INTO modele (marki_id, nazwa, moc, masa, paliwo_id, spalanie, rocznik, cena) VALUES (1, 'A6 C8 SEDAN', 286, 1.83, 2, 5.8, 2018, 300200);
INSERT INTO modele (marki_id, nazwa, moc, masa, paliwo_id, spalanie, rocznik, cena) VALUES (2, 'C W205 COUPE', 245, 1.57, 1, 6.8, 2018, 190300);


INSERT INTO samochody (modele_id, salony_id, vin) VALUES (1, 1, '1FAFP52S7WA207687');
INSERT INTO samochody (modele_id, salony_id, vin) VALUES (1, 1, '1HVBBZWL8LH649957');
INSERT INTO samochody (modele_id, salony_id, vin) VALUES (1, 2, 'YV1JS8715N1188439');
INSERT INTO samochody (modele_id, salony_id, vin) VALUES (2, 1, '1GTEG25Z5SF554347');
INSERT INTO samochody (modele_id, salony_id, vin) VALUES (2, 2, '1J4GW58J62C104995');
INSERT INTO samochody (modele_id, salony_id, vin) VALUES (3, 3, '1HD4CAM11YK126657');
INSERT INTO samochody (modele_id, salony_id, vin) VALUES (3, 3, 'YV1MS682772372352');
INSERT INTO samochody (modele_id, salony_id, vin) VALUES (3, 2, '1P3XP6435NN233464');


INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Jan', 'Kowalski', 'Sprzedawaca', 3000, 1);
INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Paweł', 'Nowak', 'Sprzedawaca', 3000, 1);
INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Dawid', 'Michalski', 'Sprzedawaca', 3000, 1);
INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Szymon', 'Zięba', 'Sprzedawaca', 3000, 2);
INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Agnieszka', 'Żak', 'Sprzedawaca', 3000, 2);
INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Wiktoria', 'Kaczmarczyk', 'Sprzedawaca', 3000, 2);
INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Mikołaj', 'Wojciechowski', 'Sprzedawaca', 3000, 3);
INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Herbert', 'Czerwiński', 'Sprzedawaca', 3000, 3);
INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Daria', 'Zielińska', 'Sprzedawaca', 3000, 3);
INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Dariusz', 'Grochowski', 'Menadżer', 6000, 1);
INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Andrzej', 'Olejniczak', 'Menadżer', 6000, 2);
INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ('Igor', 'Gołębiowski', 'Menadżer', 8000, 3);


INSERT INTO klienci (imie, nazwisko, miasto, ulica) VALUES ('Izabela', 'Nowak', 'Kraków', 'Wrocławska 8');
INSERT INTO klienci (imie, nazwisko, miasto, ulica) VALUES ('Jakub', 'Stasiak', 'Kraków', 'Reymonta 10');
INSERT INTO klienci (imie, nazwisko, miasto, ulica) VALUES ('Karolina', 'Skiba', 'Warszawa', 'Warmińska 148');
INSERT INTO klienci (imie, nazwisko, miasto, ulica) VALUES ('Alicja', 'Adamska', 'Warszawa', 'Rakowiecka 83');
INSERT INTO klienci (imie, nazwisko, miasto, ulica) VALUES ('Roman', 'Ostrowski', 'Katowice', 'Rowerowa 141');
INSERT INTO klienci (imie, nazwisko, miasto, ulica) VALUES ('Korneli', 'Zieliński', 'Katowice', 'Konopnickiej Marii 66');
INSERT INTO klienci (imie, nazwisko, miasto, ulica) VALUES ('Henryk', 'Nowicki', 'Kraków', 'Deszczowa 36');


INSERT INTO sprzedaze (samochody_id, klienci_id, pracownicy_id, salony_id, data) VALUES (6, 3, 8, 3, '29-12-2018');
INSERT INTO sprzedaze (samochody_id, klienci_id, pracownicy_id, salony_id, data) VALUES (4, 7, 2, 1, '30-12-2018');
INSERT INTO sprzedaze (samochody_id, klienci_id, pracownicy_id, salony_id, data) VALUES (1, 1, 2, 1, '04-01-2019');
INSERT INTO sprzedaze (samochody_id, klienci_id, pracownicy_id, salony_id, data) VALUES (3, 5, 4, 2, '10-01-2019');
INSERT INTO sprzedaze (samochody_id, klienci_id, pracownicy_id, salony_id, data) VALUES (2, 2, 1, 1, '11-01-2019');
INSERT INTO sprzedaze (samochody_id, klienci_id, pracownicy_id, salony_id, data) VALUES (5, 6, 6, 2, '16-01-2019');