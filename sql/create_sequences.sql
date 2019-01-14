CREATE DOMAIN vin_type AS VARCHAR CHECK (LENGTH(VALUE) = 17);

CREATE SEQUENCE salony_salony_id_seq;
CREATE SEQUENCE pracownicy_pracownicy_id_seq;
CREATE SEQUENCE paliwo_paliwo_id_seq;
CREATE SEQUENCE klienci_klienci_id_seq;
CREATE SEQUENCE marki_marki_id_seq;
CREATE SEQUENCE modele_modele_id_seq;
CREATE SEQUENCE samochody_samochody_id_seq;
CREATE SEQUENCE sprzedaze_sprzedaze_id_seq;