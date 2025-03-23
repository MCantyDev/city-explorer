## CityExplorer

### Overview

**City Explorer** is a Web application developed as part of a University project. The purpose of the project is to create the front-end of a web application which communicates with APIs such as OpenWeatherMap and Geoapify to display information about different
cities around the world. I decided to create this front-end with React as it is a more desirable skill to learn for industry

---

> **Note** - This project is primarily a University Assignment

### Features

- Home Page with Search functionalities

- General Information on City (Country, Lat-Long, Currency, Languages spoken)

- Weather information for different cities using OpenWeatherMap API (Current and Weekly)

- Any Nearby POIs with a basic OpenTripMap search

- A Map showing the cities location

### File Structure

- CityExplorerProject/: Root Directory of the project
  - public/: Public directory for any static assets
  - src/: Source directory for any application logic
      - components/: Any react components
      - config/: API config
      - controllers/: Holds any controllers used throughout the project
      - hooks/: Custom hooks used within the application
      - models/: While usually in the backend, due to being frontend only seperated Model from the "view" layer (views) and connected them with a controller for a pseudo MVC structure
      - routes/: Any Router logic housed here
      - views/: All views for the React application
      - app.jsx: Main entry point for the application
  - index.html: Outside of public due to using Vite as a build system

### Technologies Used

- **npm** - Package installer used throughout the project
- **Vite** - Build System used to bundle the project
- **React**, **React-dom**, **React-error-boundary**, **React-helmet-async**, **React-router-dom** - Chosen frontend library to develop skills for work
- **React-Bootstrap**, **Bootstrap** - Chosen style framework, due to bootstraps simplicity
- **Axios** - Axios was used to simplify the API calls
- **React-leaflet**, **Leaflet** - Leaflet was used to display a simple map within the City page

### Installation

To use the City Explorer on a local machine follow these steps

> **Note** - This project requires you to have installed 'npm'

1. **Clone the Repository**:
```bash
git clone https://github.com/Kaos455/CityExplorerProject.git
cd CityExplorerProject
```
2. **Add environment file**:
```bash
Create Environment file from the env-template with necessary API keys
```
3. **Install the Node modules**:
```bash
npm install
npm audit fix (if audit is required)
```
4. **Run the server**:
```bash
npm run dev (for the development server)

or 

npm run build
npm run preview (for the preview server)
```

### Usage

The City Explorer provides a simple interface which allows users to:

- **Search for cities around the world**: Search for a city get some useful information.

- **View the current weather of the cities**: Using OpenWeatherMap API, you can view the current weather of the searched for city.

#### Example Workflow

1. Search for a city
2. View the data given from the APIs about the city
3. Maybe plan a trip using the data given

### Licensing

This project is licensed under the MIT License - See the LICENSE file for details.
This project is a University project

---
