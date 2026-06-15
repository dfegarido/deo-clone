# Place profile photos for the EmployeeProfile deck here.

Filenames must match the `employee_id` exactly, with a `.jpg` extension,
e.g.:

    profileImg/EV_037.jpg
    profileImg/EV_038.jpg

The component looks up `/profileImg/{employee_id}.jpg` at runtime and
falls back to the user's initials if the image 404s. To force a refresh
after replacing a photo, append `?v=<timestamp>` in the future, or just
hard-refresh the browser.
