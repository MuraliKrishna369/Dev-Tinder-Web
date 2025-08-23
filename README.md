# DevTinder-Web

- Create application using vite + react
- remove unneccesary code in you app
- keep pushing your code to github
- Install Tailwindcss
- Install daisyUI
- Create a NavBar, Footer  components
- Implement Routing using react router dom
- Created Login form 
- Sent request to the server 
- Install @reduxjs/toolkit react-redux
- configure store => provide the store to app => create slice => export reducer and actions
- when user login successful navigate to feed page, and update the navabar image
- if the user is login sucessful then only navigate to feed page
- fix the problem => the user is wiped out when i refresh the page
- why? => is beacuse our redux store refreshed
- we are no more in login page to make again api call!
- So use profile/view api and get the user and store it again in redux
- whick component should make that make call
- Body compoent is best . beacause body is the parent
- Finnally devloped authorized rendering feature
- Have to devlop logout feature
- show error message when creduntails are wrong
- get data from /feed api and create userCard
- built profile page.

- implement toast when save the profile
    - get toast card from daisyUI, added to your edit profile component, when the user sent to the form.
    - add timer to disappear
- implement connections page, loggedIn user can see all his connections
- implement request received page, loggedIn user can see all his received requests

-App
    -Body
        -NavBar (fixed)
        -Content (changing according to users actions)
        -Footer (fixed)