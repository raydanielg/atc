# ATC Student Portal (ATMS) — User Manual (Kiswahili)

Huu ni mfumo wa mfano (prototype) wa **ATC Student Portal / Student Management System** unaosaidia mwanafunzi kuona taarifa muhimu za masomo na huduma za chuo kwa muonekano wa kisasa.

## Jinsi ya Kuingia (Login)

1. Fungua ukurasa wa mwanzo (Login).
2. Andika:
   - **Registration Number**
   - **Password**
3. Bonyeza **Sign in**.

Baada ya kuingia utaelekezwa kwenye **Dashboard**.

## Menyu na Kazi Zake

### 1) Dashboard

- Huonyesha muhtasari wa haraka (overview) wa huduma muhimu.
- Ndani yake utapata “cards/viashiria” vinavyokusaidia kuruka moja kwa moja kwenye kurasa kama:
  - Results
  - Timetable
  - Modules
  - Hostel
  - Student ID
  - n.k.

### 2) Profile

- Huonyesha taarifa za mwanafunzi (mfano: jina, kozi, kiwango/level, n.k.).
- Huonyesha muhtasari wa mahudhurio/utendaji (performance) kwa mwonekano rahisi.

### 3) Registration

- Huonyesha hatua (steps) za usajili wa muhula/semester.
- Inaweza kuonyesha risiti na taarifa za malipo/uthibitisho kwa muundo wa jedwali.

### 4) Modules

- Huonyesha modules za kozi yako.
- Zimepangwa kwa **Semester 1** na **Semester 2** kwenye jedwali linalosomeka kwa urahisi.

### 5) Timetable

- Huonyesha ratiba ya vipindi.
- Unaweza kuchuja kwa **siku** ili uone vipindi vya siku husika kwa haraka.

### 6) Results

- Huonyesha matokeo yakiwa yamepangwa kwa **Academic Year**.
- Chagua session husika ili kuona uchambuzi (analysis) na muhtasari wa “status” (mfano pass/fail/disco) kulingana na data ya mfano.

### 7) Exam Results (Detailed)

- Huonyesha matokeo ya exam kwa session iliyochaguliwa.
- Inakuonyesha jedwali la marks na kurasa ya “details” kwa module husika.

### 8) Exam Numbers

- Huonyesha namba yako ya mtihani na taarifa za venues (mahali pa mtihani).

### 9) Assessment Plans

- Huonyesha maendeleo ya CA (Continuous Assessment) kwa kila module.
- Huonyesha muhtasari wa jumla wa CA.

### 10) Hostel

- Huonyesha taarifa za mgao wa hostel (hostel name/room/bed).
- Ina “Hostel Card” ya kuangalia (flip) kwa mwonekano wa kisasa.

### 11) Student ID

- Huonyesha “Student ID Card” ya kuangalia (flip).
- Ina taarifa muhimu za utambulisho kwa muonekano wa kadi.

### 12) IPT Arrival Note

- Ina tabs zifuatazo:
  - **Companies**: orodha ya kampuni (mfano data).
  - **My Requests**: maombi yako ya IPT.
  - **Approvals**: maombi yaliyoidhinishwa.
  - **Arrival Notes**: kutuma taarifa ya kufika kazini (arrival note).
  - **Work Performance**: muhtasari wa utendaji (mfano data).

### 13) Alumni

- Huonyesha taarifa za graduation na vyeti (certificates).
- Unaweza kufungua **Certificate Preview** kuona muonekano wa cheti.

### 14) Certificate Preview

- Huonyesha preview ya cheti kwa muundo rasmi (official style) na watermark.
- (Kumbuka: hii ni preview ya mfano kwenye prototype.)

### 15) Project Info / Developer Profile

- Kuna “floating info icon” inayoelezea kuwa huu ni mradi wa ubunifu wa mwanafunzi.
- Ukifuata link utaona **Developer Profile** yenye:
  - Maelezo ya developer
  - Tech stack (frontend/backend)
  - Button ya **DM WhatsApp** na **SMS** kwa mawasiliano ya moja kwa moja

## Msaada wa Haraka (Troubleshooting)

- Ukishindwa kuingia:
  - Hakikisha Registration Number imeandikwa vizuri
  - Jaribu ku-refresh ukurasa kisha ingia tena
- Ukiona page haionyeshi content:
  - Rudi Dashboard kisha uingie upya kwenye menu husika

## Kwa Developer (ku-run locally)

```bash
npm install
npm run dev
```

Fungua:

- `http://localhost:3000`
