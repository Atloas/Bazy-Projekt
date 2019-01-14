CREATE VIEW sprzedaneSamochody AS SELECT * FROM samochody WHERE samochody_id NOT IN (SELECT samochody_id FROM sprzedaze);
CREATE VIEW nieSprzedaneSamochody AS SELECT * FROM samochody WHERE samochody_id IN (SELECT samochody_id FROM sprzedaze);
CREATE VIEW klienciBezZakupu AS SELECT * FROM klienci WHERE klienci_id NOT IN (SELECT klienci_id FROM sprzedaze);
CREATE VIEW modeleWgSpalaniaPaliwa AS SELECT * FROM modele ORDER BY paliwo_id, spalanie ASC;
CREATE VIEW modeleWgCenyMarki AS SELECT * FROM modele ORDER BY marki_id, cena ASC;