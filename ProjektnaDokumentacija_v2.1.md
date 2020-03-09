## GRAĐANSKA EKO PATROLA

#### TIM:TESLA- 013

```
PROJEKAT SE REALIZUJE POD POKROVITELJSTVOM
ELEKTROTEHNIČKOG FAKULTETA UNIVERZITETA U BEGORADU
```

### VERZIJE DOKUMENTA

**Verzija Datum Opis Autori**

1.0 15.02 Radna verzija za internu
upotrebu u okviru tima.

```
Aleksa Živković
```
1.1 15.02 Dopuna radne verzije Luka Matović

1.2 08.03 Novi član Aleka Živković


### SADRŽAJ

- 1.Uvod i opis delova dokumentacije
- 2.Tim
- 3.Opis sistema
    3.1 Funkcionalnost sistema
- 4.Tipovi korisnika sistema
    - 4.1 Odgovorni građanin
    - 4.2 Građanin gost
    - 4.3 Operater gradske čistoće
    - 4.4 Administrator
- 5.Tehnologija


### 1.UVOD

Priloženi dokument predstavlja svojevrsnu ličnu kartu projektnog zadatka
“Građanska eko patrola“,njegova svrha je da bude neki vid plana rada samog
tima na zadatku kao i da buduće korisnike aplikacije uvede u biznis logiku i
sistem rada aplikacije “Građanska eko patrola“.

On će ostati kao dokumentacija za budućnost na osnovu koje će se dodavati
nove funkcionalnosti i izmenjivati postojeće.


## 2.TIM

## Tim je za izradu aplikacije čine:

# • Aleksa Živković-team lead

# • Luka Matović

# • Mladen Milutinović


### 3.OPIS SISTEMA

- Aplikacija “Građanska eko patrola“ je internet aplikacija koja olakšava rad i smanjuje troškove
    komunalnih službi zaduženih za održavanje i uređivanje javnih površina gradova i opština.
- Na osnovu brojnih istaživnja utvrđeno je da najveći problem u interakciji građana i državnih
    servisa sama birokratija.Birokratija usporava rad javnih službi i troši ogroman broj sredstava
    budžeta.
- Aplikacija koju ćemo projektovati se bazira na ubrzanju čiščenja divljih deponija,nepropisno
    odloženog komunalnog otpada,nepropisno odloženih opasnih materija,nepropisno korišćenje
    zelenih površina(njihova uzurpacija) kao i za ostale komunalne probleme koji se mogu pojaviti u
    određenom mestu a spadaju u nadležnost komunalnih službi.


### 3.1 OPIS SITEMA-FUNKCIONISANJE SISTEMA

- Funkcionisanje sistema se svodi na to da odgovorni građani kada u svom naselju
    naiđu na neki od problema,pristupe internet aplikaciji uloguju se na svoj nalog i
    nakon toga na Google Mapi obeleže lokaciju problema kao i da uz lokaciju prilože
    sliku,kratak opis itd.
- Operatori aplikacije u komunalnoj službi dobija lokacije problema na prikazane na
    Google Mapi različito obeležene zavisno od tipa komunalnog problema,na osnovu
    kojih može efikasno da pošalje odgovarajuće ekipe na mesto problema.
- Nakon obavljenog posla građanin koji je poslao informaciju o problemu će dobiti
    povratni mejl sa detaljima o urađenom poslu.


### 4.TIPOVI KORISNIKA SISTEMA

- 4.1 Korisnik: **OdgovorniGrađanin(Registrovan)**
- Odgovorni građanin kada naiđe na problem(ekološke prirode),pristupa internetu,loguje se i
    popunjava internet prijavu gde navodi lokaciju nastalog problema(preko Google Maps),navodi
    tip tj vrstu ekološkog problmea kako bi sistem znao kojoj kancelariji u okviru komunalnog
    preduzeća da pošalje zahtev.Uz gore navedene podatke građanin ostavlja određeni tekstualni
    opis kako bi olakšao radnicima gradske čistoće.
- Građani tokom godine skupljaju poene,poeni im se dodeljuju na osnovu svakog uspešno
    odrađenog posla gradske čistoće koji im je prosleđen po prijavi određenog građanina.Na kraju
    godine te poene mogu zameniti za određene poklone i pogodnosti koje nudi gradska čistoća.
- Građanin dobija potvrdu preko e-mail-a da je njegov zahtev prihvaćen od strane gradske
    čistoće a na kraju dobija i potvrdu da je problem otklonjen.


### 4.TIPOVI KORISNIKA SISTEMA

- 4.2 **Korisnik:Građani Gost(Neregistrovani korisnik sistema)**
- Gost ima pravo da pogleda mapu na kojoj su obeleženi trenutno nerešeni ekološki
    problemi.
- Ima pravo da se registruje.
- Ima pravo da pročita ToS.


### 4.TIPOVI KORISNIKA SISTEMA

- 4.3 **Operater u komunalnoj službi**
- Radnik komunalne službe pristupom aplikaciji ima uvid u celokupnu mapu
    grada na kojima se nalaze obeležena mesta ekoloških problema.
- Različitim bojama obeleženi su različiti tipovi problema,uz tip problema
    operater može da vidi datum postavke problema,sliku porblema i kratak
    tekstualni opis.Na osnovu ovih stvari operater zna koju ekipu gradski službi da
    pošalje na lice mesta.


### TIPOVI KORISNIKA SISTEMA

- Korisnik najviseg prioriteta: Administrator sitema
- Brine se o urednosti baze podataka internet aplikacije i njenoj ažurnosti
- Kao korisnik sa najvećim privilegijama može da promeni status ili suspenduje

```
korisnika u slučaju nedoličnog ponašanja ili zloupotrebljavanja aplikacije
```

### 5.TEHNOLOGIJA

- Za izradu ovog projekta koristićemo više različitih biblioteka koje će
    funkcionisati zajedno.
- FrontEnd:HTML5,CSS3,Javascript...
- BackEnd:Node.JS na serverskoj strani a što se tiče baze podatka koristiće se
    mySQl
- Za testiranje će se koristit JUNIT i MOCKITO