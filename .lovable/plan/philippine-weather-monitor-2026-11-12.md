# Philippine Weather Monitor

## What will change
- Remove outbound PAGASA/PANaHON links from the nationwide conditions monitor.
- Keep nationwide conditions visible in the website with a mobile-friendly Philippine map and weather summaries for representative locations.
- Keep the Carcar forecast and weather advisor visible and easy to reach.

## Technical details
- Use the existing Open-Meteo forecast source for Carcar and representative Philippine locations; label the nationwide readings as model-based conditions, not official PAGASA warnings.
- Build the map and location summaries with existing React and design-system tokens; do not add external map or imagery links.
