<img src=https://i.imgur.com/OHysOUL.png>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#project-summary">Project Summary</a>
      <ul>
        <li><a href="#wiki-links">Wiki</a></li>
        <li><a href="#tech-stack">Tech Stack</a></li>
      </ul>
    </li>
    <li>
      <a href="#sample-features">Sample Features</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact-information">Contact Me</a></li>
  </ol>
</details>

## Project Summary
TuneNimbus is a SoundCloud clone. Here's their website: [SoundCloud](https://soundcloud.com/). On TuneNimbus, you can listen to more than -1 songs, upload music, and create your own playlists, at NO COST. By uploading your music to this site, you give me consent to use your creative material for FREE! Check it out [here](https://tunenimbus.herokuapp.com/)

## Wiki Links
* [Backend Routes (API Documentation)](https://github.com/jakezmat/API-Project/wiki/API-Documentation)
* [Database Schema](https://github.com/jakezmat/API-Project/wiki#database-schema)
* [Feature List](https://github.com/jakezmat/API-Project/wiki#feature-list)
* [Redux Store Shape](https://github.com/jakezmat/API-Project/wiki#redux-state-shape)

## Tech Stack

### Frameworks, Platforms, and Libararies:

![Javascript](https://img.shields.io/badge/Javascript%20-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![REACT](https://img.shields.io/badge/REACT%20-61DAFB?style=for-the-badge&logo=REACT&logoColor=white)
![EXPRESS](https://img.shields.io/badge/Express%20-000000?style=for-the-badge&logo=REACT&logoColor=white)
![REDUX](https://img.shields.io/badge/Redux%20-764ABC?style=for-the-badge&logo=Redux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.Js%20-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
### Database and Host:
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Postgresql](https://img.shields.io/badge/Postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![HEROKU](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=Heroku&logoColor=white)

# Sample Features
## Landing Page
<img src=https://i.imgur.com/psalkRp.gif>

# Getting Started

To get a local copy up and running follow these simple example steps.

1. Clone the repo:

    SSH version:
    ```sh
    git clone git@github.com:jakezmat/API-Project.git
    ```
    or

    HTTPS version:
    ```sh
    git clone https://github.com/jakezmat/API-Project.git
    ```

2. Navigate into the backend folder and run the following command.
    ```sh
    npm install
    ```
3. Use the .env.example file to create a .env file at the root of the backend folder and change the appropriate fields.
    ```sh
    cp .env.example .env
    ```
4. Migrate and seed the files while in the backend folder using the following commands:
    ```sh
    npm run migrate
    ```
    ```sh
    npm run seed
    ```
5. Run the following command to start the backend server.
    ```sh
    npm start
    ```
6. In a new terminal, navigate into the frontend folder and use the following command.
    ```sh
    npm install
    ```
7. Run the following command to start the frontend server.
    ```sh
    npm start
8. Go to localhost:3000 in your browser to view the site. Ensure that both frontend and backend servers are running.

## Roadmap

- [x] Songs
    - [x] Create a song
    - [x] Load all song
    - [x] Load a song's details
    - [x] View a list of the current user's songs
    - [x] Edit song details
    - [x] Delete a song
- [ ] Playlists
    - [x] Create a playlist
    - [x] See list of the current user's playlists
    - [x] Add a song to a playlist
    - [ ] Edit a playlist
    - [x] Delete a playlist
- [ ] Comments
    - [ ] Create a comment
    - [ ] See all comments of a song
    - [ ] Edit a comment
    - [ ] Delete a comment
- [ ] Albums
    - [ ] Get all Albums
    - [ ] Get all Albums created by the Current User
    - [ ] Get all Albums of an Artist from an id
    - [ ] Get details of an Album from an id
    - [ ] Create an Album
    - [ ] Edit an Album
    - [ ] Delete an Album
- [ ] Search
    - [ ] Filter song search by:
        - [ ] page
        - [ ] size
        - [ ] title
        - [ ] date

# Contact Information
<img src=https://i.imgur.com/2ffGJqj.png width=20> [LinkedIn](https://www.linkedin.com/in/jake-matillano-b141811a3)
<img src=https://i.imgur.com/w9xwrCT.png width=20> [GitHub](https://github.com/jakezmat)
