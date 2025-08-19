מערכת מעקב לידים – Lead Tracking Dashboard

מערכת זו מאפשרת לבעלי עסקים לעקוב אחרי הלידים שלהם בצורה נוחה ודינמית. המערכת אוספת מידע על לידים שנכנסים מהקמפיינים השונים, מזהה את מקורם (UTM, URL, פייסבוק, גוגל וכו׳) ומציגה את הנתונים בצורה ויזואלית עם גרפים וטבלאות.

🎯 מטרת המערכת

לעקוב אחרי כל הלידים הנכנסים לאתר או לקמפיינים פרסומיים.

לזהות ממקור/קמפיין כל ליד (Facebook, Google, Instagram, TikTok, YouTube, כניסה ישירה).

להציג סטטיסטיקות בזמן אמת:

סה"כ לידים

לידים היום

לידים השבוע

התפלגות לידים לפי מקור

לידים יומיים

אפשרות לצפות ברשימת כל הלידים עם פרטים: שם, אימייל, טלפון, מקור, קמפיין ותאריך כניסה.

🛠 טכנולוגיות

Frontend:

React.js + Vite

Bootstrap + Bootstrap Icons

Recharts (גרפים)

React Icons (אייקונים של פייסבוק, גוגל וכו׳)

Backend:

Node.js + Express

MongoDB (לאחסון הלידים)

📂 מבנה הפרויקט
my-leads-app/
├─ frontend/            # Frontend React
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ LeadsList.jsx
│  │  │  └─ Statistics.jsx
│  │  ├─ App.jsx
│  │  └─ App.css
│  └─ vite.config.js
├─ backend/             # Backend Node.js + Express
│  ├─ server.js
│  └─ routes/
│      └─ leads.js
├─ package.json
└─ README.md



המערכת רצה בכתובת: https://progect-lids.onrender.com


📊 תכונות עיקריות

סטטיסטיקות גרפיות

גרף Pie – התפלגות לידים לפי מקור.

גרף Bar – לידים יומיים לפי תאריך.

רשימת לידים מלאה

שם, אימייל, טלפון

מקור וקמפיין

תאריך כניסה

עיצוב רספונסיבי באמצעות Bootstrap.

אייקונים מותאמים לכל מקור (Facebook, Google, Instagram, TikTok, YouTube, Direct).


🔧 שדרוגים עתידיים

סינון לפי תאריכים וקמפיינים.

חיפוש מתקדם בלידים.

חיווי בזמן אמת – WebSocket.

אפשרות להוריד דו״ח Excel או PDF.

ממשק למעקב אחרי קמפיינים ספציפיים.



הטמעת טופס לידים בקמפיינים

ניתן להטמיע את הקוד הבא בכל טופס בקמפיין פרסומי כדי לשלוח לידים ישירות למערכת ולעקוב אחרי מקורם (פייסבוק, גוגל, אינסטגרם, יוטיוב ועוד):

<form id="leadForm">
  <input type="text" name="name" placeholder="שם מלא" required />
  <input type="email" name="email" placeholder="אימייל" required />
  <input type="tel" name="phone" placeholder="טלפון" />
  <button type="submit">שלח</button>
</form>

<script>
  const form = document.getElementById('leadForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      url: window.location.href
    };

    try {
      const response = await fetch('https://progect-lids.onrender.com/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        alert('הליד נשלח בהצלחה!');
        form.reset();
      } else {
        alert('שגיאה בשליחת הליד: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('שגיאה בשרת. נסה שוב.');
    }
  });
</script>

יתרונות השיטה

מזהה את מקור הליד לפי UTM או פרמטרים כמו fbclid, gclid, ytclid.

שולח את כל הנתונים לשרת המרכזי ומאפשר סטטיסטיקות וגרפים בזמן אמת.

מאפשר אופטימיזציה של תקציב הפרסום על בסיס ביצועי הקמפיינים.



📞 קשר

מפתח: אלימלך שיינברגר

לינקדאין:  https://www.linkedin.com/in/elimelech-scheinberger-36827b343/