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

📞 קשר

מפתח: אלימלך שיינברגר

לינקדאין:  https://www.linkedin.com/in/elimelech-scheinberger-36827b343/