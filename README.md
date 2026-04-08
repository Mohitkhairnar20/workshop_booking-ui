# Workshop Booking

This project is a workshop booking portal for coordinators and instructors. Coordinators can register, check available workshop types, propose workshop dates, and track the status of their requests.

For this task, I focused on improving the UI/UX of the existing project without changing the main booking flow.

## What I changed

- Redesigned the shared layout and navigation to make the site easier to use on smaller screens.
- Improved the login, registration, proposal, dashboard, profile, and workshop detail pages.
- Reworked the workshop types page so it is easier to scan on mobile.
- Added small React-based enhancements for workshop browsing and dashboard summaries instead of rewriting the whole site as a SPA.
- Improved form styling, spacing, hierarchy, and focus states for better usability and accessibility.

## Setup

Run these commands from the project root:

```bash
pip install -r requirements.txt
npm install
npm run build-ui
python manage.py migrate
python manage.py runserver
```

Then open [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

You can also directly open:

- [http://127.0.0.1:8000/workshop/login/](http://127.0.0.1:8000/workshop/login/)
- [http://127.0.0.1:8000/workshop/register/](http://127.0.0.1:8000/workshop/register/)
- [http://127.0.0.1:8000/workshop/types/](http://127.0.0.1:8000/workshop/types/)

## Reasoning

### What design principles guided your improvements?

The main principles were clarity, hierarchy, and ease of use on mobile. The original pages were functional, but many of them felt dense and table-heavy. I tried to make the most important actions easier to notice by improving spacing, typography, grouping, and button treatment. I also kept the styling consistent across pages so the interface feels more unified.

### How did you ensure responsiveness across devices?

I treated mobile as the primary screen size because the task specifically mentions students using the website mainly on phones. The shared CSS was updated with responsive spacing, flexible layouts, and better handling of forms and tables. I also changed some views from being only table-oriented to having more card-like sections that are easier to read on smaller screens.

### What trade-offs did you make between design and performance?

I did not convert the whole project into a fully client-rendered React app. Since this repository is mainly a Django template-based application, a full rewrite would have added more complexity and more performance cost. Instead, I kept server rendering for the main pages and added React only where it improved interaction, like workshop browsing and dashboard summaries.

### What was the most challenging part of the task and how did you approach it?

The most challenging part was balancing the React requirement with the actual structure of the repository. This project was not set up as a React frontend, so I had to decide how to use React in a way that still made sense for the existing codebase. I solved that by using React as progressive enhancement instead of forcing a full migration.

## Before and After

### Login page

Before:

![Before login](/Users/Mohit%20Khairnar/Desktop/workshop_booking/docs/screenshots/before-login.png)

After:

![After login](/Users/Mohit%20Khairnar/Desktop/workshop_booking/docs/screenshots/after-login.png)

### Workshop types page

Before:

![Before workshop types](/Users/Mohit%20Khairnar/Desktop/workshop_booking/docs/screenshots/before-types.png)

After:

![After workshop types](/Users/Mohit%20Khairnar/Desktop/workshop_booking/docs/screenshots/after-types.png)

## Notes

- `python manage.py check` passes.
- `python manage.py test workshop_app.tests` fails in the current repository because the existing test files import symbols that are already missing from the project (`RequestedWorkshop` and `edit_profile`). I did not change those tests as part of this UI/UX task.

More project setup details are available in [docs/Getting_Started.md](/Users/Mohit%20Khairnar/Desktop/workshop_booking/docs/Getting_Started.md).
