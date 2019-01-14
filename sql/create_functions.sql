CREATE FUNCTION nowySamochod() RETURNS TRIGGER AS '
    DECLARE
        res record;
    BEGIN
        IF (TG_OP = ''INSERT'') THEN
            SELECT * INTO res FROM samochody WHERE vin = new.vin;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND new.vin <> old.vin) THEN
            SELECT * INTO res FROM samochody WHERE vin = new.vin;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RETURN NULL;
            END IF;
        END IF;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowyKlient() RETURNS TRIGGER AS '
    DECLARE
        res record;
    BEGIN
        IF (TG_OP = ''INSERT'') THEN
            SELECT * INTO res FROM klienci WHERE imie = new.imie AND nazwisko = new.nazwisko AND miasto = new.miasto AND ulica = new.ulica;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND new.imie <> old.imie OR old.nazwisko <> new.nazwisko OR old.miasto <> new.miasto OR old.ulica <> new.ulica) THEN
            SELECT * INTO res FROM klienci WHERE imie = new.imie AND nazwisko = new.nazwisko AND miasto = new.miasto AND ulica = new.ulica;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RETURN NULL;
            END IF;
        END IF;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowePaliwo() RETURNS TRIGGER AS '
    DECLARE
        res record;
    BEGIN
        IF (TG_OP = ''INSERT'') THEN
            SELECT * INTO res FROM paliwo WHERE nazwa = new.nazwa;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND new.nazwa <> old.nazwa) THEN
            SELECT * INTO res FROM paliwo WHERE nazwa = new.nazwa;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RETURN NULL;
            END IF;
        END IF;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowaMarka() RETURNS TRIGGER AS '
    DECLARE
        res record;
    BEGIN
        IF (TG_OP = ''INSERT'') THEN
            SELECT * INTO res FROM marki WHERE nazwa = new.nazwa;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND new.nazwa <> old.nazwa) THEN
            SELECT * INTO res FROM marki WHERE nazwa = new.nazwa;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RETURN NULL;
            END IF;
        END IF;
    END
' LANGUAGE 'plpgsql';

CREATE TRIGGER InsertUpdateSamochody BEFORE INSERT OR UPDATE ON samochody FOR EACH ROW EXECUTE PROCEDURE nowySamochod();
CREATE TRIGGER InsertUpdateKlienci BEFORE INSERT OR UPDATE ON klienci FOR EACH ROW EXECUTE PROCEDURE nowyKlient();
CREATE TRIGGER InsertUpdatePaliwo BEFORE INSERT OR UPDATE ON paliwo FOR EACH ROW EXECUTE PROCEDURE nowePaliwo();
CREATE TRIGGER InsertUpdateMarki BEFORE INSERT OR UPDATE ON marki FOR EACH ROW EXECUTE PROCEDURE nowaMarka();