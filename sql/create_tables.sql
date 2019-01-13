CREATE SEQUENCE salony_salony_id_seq;

CREATE TABLE salony (
                salony_id INTEGER NOT NULL DEFAULT nextval('salony_salony_id_seq'),
                miasto VARCHAR NOT NULL,
                ulica VARCHAR NOT NULL,
                CONSTRAINT salony_pk PRIMARY KEY (salony_id)
);

CREATE SEQUENCE pracownicy_pracownicy_id_seq;

CREATE TABLE pracownicy (
                pracownicy_id INTEGER NOT NULL DEFAULT nextval('pracownicy_pracownicy_id_seq'),
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                pozycja VARCHAR NOT NULL,
                placa NUMERIC(7,2) NOT NULL,
                salony_id INTEGER NOT NULL,
                CONSTRAINT pracownicy_pk PRIMARY KEY (pracownicy_id),
                CONSTRAINT salony_pracownicy_fk FOREIGN KEY (salony_id) REFERENCES salony (salony_id)
);

CREATE SEQUENCE paliwo_paliwo_id_seq;

CREATE TABLE paliwo (
                paliwo_id INTEGER NOT NULL DEFAULT nextval('paliwo_paliwo_id_seq'),
                nazwa VARCHAR NOT NULL,
                CONSTRAINT paliwo_pk PRIMARY KEY (paliwo_id)
);

CREATE SEQUENCE klienci_klienci_id_seq;

CREATE TABLE klienci (
                klienci_id INTEGER NOT NULL DEFAULT nextval('klienci_klienci_id_seq'),
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                miasto VARCHAR NOT NULL,
                ulica VARCHAR NOT NULL,
                CONSTRAINT klienci_pk PRIMARY KEY (klienci_id)
);

CREATE SEQUENCE marki_marki_id_seq;

CREATE TABLE marki (
                marki_id INTEGER NOT NULL DEFAULT nextval('marki_marki_id_seq'),
                nazwa VARCHAR NOT NULL,
                CONSTRAINT marki_pk PRIMARY KEY (marki_id)
);

CREATE SEQUENCE modele_modele_id_seq;

CREATE TABLE modele (
                modele_id INTEGER NOT NULL DEFAULT nextval('modele_modele_id_seq'),
                marki_id INTEGER NOT NULL,
                nazwa VARCHAR NOT NULL,
                moc INTEGER NOT NULL,
                masa NUMERIC(4,2) NOT NULL,
                paliwo_id INTEGER NOT NULL,
                spalanie VARCHAR NOT NULL,
                rocznik INTEGER NOT NULL,
                cena INTEGER NOT NULL,
                CONSTRAINT modele_pk PRIMARY KEY (modele_id),
                CONSTRAINT paliwo_modele_fk FOREIGN KEY (paliwo_id) REFERENCES paliwo (paliwo_id),
                CONSTRAINT marki_modele_fk FOREIGN KEY (marki_id) REFERENCES marki (marki_id)
);

CREATE SEQUENCE samochody_samochody_id_seq;

CREATE TABLE samochody (
                samochody_id INTEGER NOT NULL DEFAULT nextval('samochody_samochody_id_seq'),
                modele_id INTEGER NOT NULL,
                salony_id INTEGER NOT NULL,
                vin VARCHAR NOT NULL,
                CONSTRAINT samochody_pk PRIMARY KEY (samochody_id),
                CONSTRAINT salony_samochody_fk FOREIGN KEY (salony_id) REFERENCES salony (salony_id),
                CONSTRAINT modele_samochody_fk FOREIGN KEY (modele_id) REFERENCES modele (modele_id)
);

CREATE SEQUENCE sprzedaze_sprzedaze_id_seq;

CREATE TABLE sprzedaze (
                sprzedaze_id INTEGER NOT NULL DEFAULT nextval('sprzedaze_sprzedaze_id_seq'),
                samochody_id INTEGER NOT NULL,
                klienci_id INTEGER NOT NULL,
                pracownicy_id INTEGER NOT NULL,
                salony_id INTEGER NOT NULL,
                data DATE NOT NULL,
                CONSTRAINT sprzedaze_pk PRIMARY KEY (sprzedaze_id),
                CONSTRAINT salony_sprzedaze_fk FOREIGN KEY (salony_id) REFERENCES salony (salony_id),
                CONSTRAINT pracownicy_sprzedaze_fk FOREIGN KEY (pracownicy_id) REFERENCES pracownicy (pracownicy_id),
                CONSTRAINT klienci_sprzedaze_fk FOREIGN KEY (klienci_id) REFERENCES klienci (klienci_id),
                CONSTRAINT samochody_sprzedaze_fk FOREIGN KEY (samochody_id) REFERENCES samochody (samochody_id)
);