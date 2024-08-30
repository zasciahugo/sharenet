# Sharenet - Vue.js SPA Project
===============================

This project is a responsive Vue.js Single Page Application (SPA) named "Sharenet." It features three main pages, each with distinct functionality:

1. **Landing Page**: Displays a sortable table of Spot prices using data from the Sharenet API.
2. **Contact Us Page**: Provides Sharenet's contact details, including address, phone numbers, and a Google Map location.
3. **Venues and Workshops Page**: Showcases different venues and workshop dates, allowing users to book available dates.

## Project Overview

### Page 1 - Landing Page
- **Objective**: Create a landing page featuring a sortable table that displays the latest 5 spot prices for each category from the Sharenet API.
- **API Endpoint**: [Sharenet Spot Prices API](https://api.sharenet.co.za/api/v1/px2/spots)
- **Table Columns**:
  - FullName
  - Price
  - Move
  - Percentage Move (formatted to 2 decimal places)
  - Time
- **Features**:
  - Sortable table columns.
  - Data passed as props to components.
  - Mobile responsiveness.
- **Navigation**:
  - Menu with links to the Contact Us Page (Page 2) and Venues and Workshops Page (Page 3).

### Page 2 - Contact Us Page
- **Objective**: Display Sharenet's contact information, including address, phone numbers, and a Google Map showing the location.
- **Features**:
  - Link back to the Landing Page (Page 1).

### Page 3 - Venues and Workshops Page
- **Objective**: Display various venues and workshop dates. Provide functionality for users to book available dates.
- **Features**:
  - Display both available and sold-out dates.
  - Filter to show only dates with seats available.
  - Save bookings to a Node.js server, with data stored in a MySQL database.
  - Interaction with a live API (not localhost).

### Extra Bonus - Docker Image
- **Objective**: Package the application into a Docker image for easy deployment.

## Getting Started

### Prerequisites
- **Node.js** and **npm** installed.
- **Docker** installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/sharenet.git
   cd sharenet
