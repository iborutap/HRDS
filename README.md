# Data Management System

A modern web application for managing personal data with Google Sheets integration, featuring user authentication, data visualization, and comprehensive CRUD operations.

## Features

### 🔐 Authentication System
- Secure login for 10 predefined users (2 admins, 8 regular users)
- Role-based access control
- Session management

### 📊 Dashboard & Analytics
- Interactive dashboard with feature cards
- Real-time statistics and data insights
- Visual charts for data distribution (gender, age groups, blood types, religion)
- Responsive design optimized for all devices

### 📝 Data Management
- Complete CRUD operations for personal records
- Advanced search and filtering capabilities
- Sortable data tables with intuitive controls
- Form validation and error handling

### 🔌 Google Sheets Integration
- Seamless integration with Google Sheets API
- Real-time data synchronization
- Automatic backup and data persistence
- Support for multiple spreadsheet operations

### 📱 Modern UI/UX
- Glass-morphism design with gradient backgrounds
- Smooth animations and micro-interactions
- Mobile-first responsive design
- Clean typography with proper contrast ratios

## Data Structure

The system manages the following personal information:
- Full Name
- Population ID (16-digit unique identifier)
- Family ID (16-digit unique family identifier)
- Gender (Male/Female)
- Date of Birth
- Place of Birth
- Religion
- Blood Type (A+, A-, B+, B-, AB+, AB-, O+, O-)

## Demo Credentials

### Administrator Access
- Username: `admin1` | Password: `admin123`
- Username: `admin2` | Password: `admin123`

### User Access
- Username: `user1` to `user8` | Password: `user123`

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns for date calculations
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API Integration**: Google Sheets API

## Google Sheets Setup

To connect with your Google Sheets:

1. Create a Google Cloud Project
2. Enable the Google Sheets API
3. Create credentials (API key or OAuth2)
4. Share your spreadsheet with the service account
5. Update the `GoogleSheetsService` configuration

## Getting Started

1. Clone the project
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open your browser to the provided local URL
5. Login with demo credentials

## Production Deployment

For production deployment:

1. Set up proper environment variables
2. Configure Google Sheets API credentials
3. Implement secure authentication backend
4. Set up proper database backup strategies
5. Configure SSL certificates and security headers

## Security Considerations

- Implement secure authentication backend for production
- Use environment variables for sensitive data
- Set up proper CORS policies
- Implement rate limiting for API calls
- Regular security audits and updates

## Future Enhancements

- Real-time collaboration features
- Advanced reporting and export options
- Mobile app version
- Integration with other data sources
- Automated data validation and cleanup tools