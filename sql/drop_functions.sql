DROP TRIGGER InsertUpdateSamochody ON samochody;
DROP TRIGGER InsertUpdateKlienci ON klienci;
DROP TRIGGER InsertUpdatePaliwo ON paliwo;
DROP TRIGGER InsertUpdateMarki ON marki;
DROP TRIGGER InsertUpdateModele ON modele;

DROP FUNCTION nowySamochod();
DROP FUNCTION nowyKlient();
DROP FUNCTION nowePaliwo();
DROP FUNCTION nowaMarka();
DROP FUNCTION nowyModel();

DROP FUNCTION selectKlientByName(VARCHAR, VARCHAR);