CREATE SEQUENCE salony_salon_id_seq;

CREATE TABLE salony (
                salon_id INTEGER NOT NULL DEFAULT nextval('salony_salon_id_seq'),
                miasto VARCHAR NOT NULL,
                ulica VARCHAR NOT NULL,
                CONSTRAINT salony_pk PRIMARY KEY (salon_id)
);

CREATE SEQUENCE pracownicy_pracownik_id_seq;

CREATE TABLE pracownicy (
                pracownik_id INTEGER NOT NULL DEFAULT nextval('pracownicy_pracownik_id_seq'),
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                pozycja VARCHAR NOT NULL,
                placa NUMERIC(7,2) NOT NULL,
                salon_id INTEGER NOT NULL,
                CONSTRAINT pracownicy_pk PRIMARY KEY (pracownik_id),
                CONSTRAINT salony_pracownicy_fk FOREIGN KEY (salon_id) REFERENCES salony (salon_id)
);

CREATE SEQUENCE paliwo_paliwo_id_seq;

CREATE TABLE paliwo (
                paliwo_id INTEGER NOT NULL DEFAULT nextval('paliwo_paliwo_id_seq'),
                nazwa VARCHAR NOT NULL,
                CONSTRAINT paliwo_pk PRIMARY KEY (paliwo_id)
);

CREATE SEQUENCE klienci_klient_id_seq;

CREATE TABLE klienci (
                klient_id INTEGER NOT NULL DEFAULT nextval('klienci_klient_id_seq'),
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                miasto VARCHAR NOT NULL,
                ulica VARCHAR NOT NULL,
                CONSTRAINT klienci_pk PRIMARY KEY (klient_id)
);

CREATE SEQUENCE marki_marka_id_seq;

CREATE TABLE marki (
                marka_id INTEGER NOT NULL DEFAULT nextval('marki_marka_id_seq'),
                nazwa VARCHAR NOT NULL,
                CONSTRAINT marki_pk PRIMARY KEY (marka_id)
);

CREATE SEQUENCE modele_model_id_seq;

CREATE TABLE modele (
                model_id INTEGER NOT NULL DEFAULT nextval('modele_model_id_seq'),
                marka_id INTEGER NOT NULL,
                nazwa VARCHAR NOT NULL,
                moc INTEGER NOT NULL,
                masa NUMERIC(4,2) NOT NULL,
                paliwo_id INTEGER NOT NULL,
                spalanie VARCHAR NOT NULL,
                rocznik INTEGER NOT NULL,
                cena INTEGER NOT NULL,
                CONSTRAINT modele_pk PRIMARY KEY (model_id),
                CONSTRAINT paliwo_modele_fk FOREIGN KEY (paliwo_id) REFERENCES paliwo (paliwo_id),
                CONSTRAINT marki_modele_fk FOREIGN KEY (marka_id) REFERENCES marki (marka_id)
);

CREATE SEQUENCE samochody_samochod_id_seq;

CREATE TABLE samochody (
                samochod_id INTEGER NOT NULL DEFAULT nextval('samochody_samochod_id_seq'),
                model_id INTEGER NOT NULL,
                salon_id INTEGER NOT NULL,
                vin VARCHAR NOT NULL,
                CONSTRAINT samochody_pk PRIMARY KEY (samochod_id),
                CONSTRAINT salony_samochody_fk FOREIGN KEY (salon_id) REFERENCES salony (salon_id),
                CONSTRAINT modele_samochody_fk FOREIGN KEY (model_id) REFERENCES modele (model_id)
);

CREATE SEQUENCE sprzedaze_sprzedaz_id_seq;

CREATE TABLE sprzedaze (
                sprzedaz_id INTEGER NOT NULL DEFAULT nextval('sprzedaze_sprzedaz_id_seq'),
                samochod_id INTEGER NOT NULL,
                klient_id INTEGER NOT NULL,
                pracownik_id INTEGER NOT NULL,
                salon_id INTEGER NOT NULL,
                data DATE NOT NULL,
                CONSTRAINT sprzedaze_pk PRIMARY KEY (sprzedaz_id),
                CONSTRAINT salony_sprzedaze_fk FOREIGN KEY (salon_id) REFERENCES salony (salon_id),
                CONSTRAINT pracownicy_sprzedaze_fk FOREIGN KEY (pracownik_id) REFERENCES pracownicy (pracownik_id),
                CONSTRAINT klienci_sprzedaze_fk FOREIGN KEY (klient_id) REFERENCES klienci (klient_id),
                CONSTRAINT samochody_sprzedaze_fk FOREIGN KEY (samochod_id) REFERENCES samochody (samochod_id)
);