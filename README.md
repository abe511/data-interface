## a simple interface to manipulate data

### [preview](https://dataface.onrender.com)

(wait a bit for the server to start up)

---

### to run locally:
clone the repo

#### to install the backend go to `server` directory:
```
cd server
```
create a virtual environment

```
python -m venv venv
```

install the dependencies
```
pip install -r requirements.txt
```

run the server
```
gunicorn app:app
```
or
```
flask run
```

copy the URL

for gunicorn: http://127.0.0.1:8000

for flask: http://127.0.0.1:3000

---

#### to install the frontend go to `client` directory:
```
cd client
```

rename `.env.example` file to `.env`

inside `.env` file modify the `VITE_BASE_URL` with the new URL

install dependencies
```
npm install
```

run the app
```
npm run preview
```

open `http://localhost:4173/` in your browser


* select data points using the selector form
* use Interactive mode to see changes immediately
* draw a region in the viewer to select points
* create a new record
* view the full list
* open and edit any record
* add or remove labels
* save or remove records
* view selected data points