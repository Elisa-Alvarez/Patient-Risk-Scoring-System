# Healthcare Risk Assessment Dashboard

A comprehensive healthcare analytics application that integrates with the DemoMed Healthcare API to perform real-time patient risk assessments based on vital signs and demographic data.

![Healthcare Dashboard](https://img.shields.io/badge/Status-Fully%20Functional-brightgreen)
![React](https://img.shields.io/badge/React-18.0+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Express](https://img.shields.io/badge/Express-4.0+-green)

## 🏥 Overview

This application provides healthcare professionals with an intelligent dashboard for analyzing patient data and calculating risk scores based on:

- **Blood Pressure Analysis**: Categorizes patients into normal, elevated, stage 1, and stage 2 hypertension
- **Temperature Monitoring**: Identifies fever conditions and temperature anomalies
- **Age-Based Risk Factors**: Calculates age-related health risks
- **Data Quality Assessment**: Flags incomplete or inconsistent patient records

## ✨ Key Features

### 📊 Real-Time Dashboard
- **Statistics Cards**: Live patient counts, risk distributions, and data quality metrics
- **Alert Panels**: Immediate visibility into high-risk patients, fever cases, and data issues
- **Interactive Visualizations**: Animated risk score displays and trend indicators

### 🔍 Advanced Patient Analysis
- **Comprehensive Risk Scoring**: Multi-factor algorithm combining BP, temperature, and age
- **Smart Search & Filtering**: Find patients by ID, name, or risk criteria
- **Pagination Controls**: Efficient handling of large patient datasets
- **Data Validation**: Robust handling of inconsistent API data formats

### 📋 Assessment Management
- **Automated Risk Calculation**: Real-time scoring based on clinical guidelines
- **Assessment Submission**: Submit findings to external evaluation systems
- **Fallback Processing**: Continues operation even when external APIs are unavailable
- **Detailed Feedback**: Comprehensive scoring breakdowns and improvement suggestions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- DemoMed Healthcare API access

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd healthcare-risk-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file or use Replit secrets:
   ```
   API_KEY=your_demomed_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000` to view the dashboard

## 🏗️ Architecture

### Frontend (React + TypeScript)
```
client/
├── index.html                      # Main HTML template
└── src/
    ├── components/
    │   ├── dashboard/
    │   │   ├── AlertPanels.tsx     # High-priority patient alerts
    │   │   ├── ApiControlPanel.tsx # Data refresh and submission controls
    │   │   ├── AssessmentModal.tsx # Assessment results display
    │   │   ├── PatientTable.tsx    # Interactive patient data table
    │   │   └── StatsCards.tsx      # Patient statistics display
    │   └── ui/                     # Shadcn/ui component library
    │       ├── accordion.tsx       # Collapsible content panels
    │       ├── alert-dialog.tsx    # Modal confirmation dialogs
    │       ├── alert.tsx          # Notification alerts
    │       ├── avatar.tsx         # User profile images
    │       ├── badge.tsx          # Status indicators
    │       ├── button.tsx         # Interactive buttons
    │       ├── card.tsx           # Content containers
    │       ├── dialog.tsx         # Modal dialogs
    │       ├── form.tsx           # Form components
    │       ├── input.tsx          # Text input fields
    │       ├── label.tsx          # Form labels
    │       ├── loading-spinner.tsx # Loading indicators
    │       ├── progress.tsx       # Progress bars
    │       ├── select.tsx         # Dropdown selectors
    │       ├── table.tsx          # Data tables
    │       ├── toast.tsx          # Notification toasts
    │       ├── toaster.tsx        # Toast container
    │       ├── tooltip.tsx        # Hover information
    │       ├── tabs.tsx           # Tabbed interfaces
    │       ├── switch.tsx         # Toggle switches
    │       ├── slider.tsx         # Range sliders
    │       ├── skeleton.tsx       # Loading placeholders
    │       ├── sidebar.tsx        # Navigation sidebar
    │       ├── sheet.tsx          # Slide-out panels
    │       ├── separator.tsx      # Visual dividers
    │       ├── scroll-area.tsx    # Custom scrollbars
    │       ├── resizable.tsx      # Resizable panels
    │       ├── radio-group.tsx    # Radio button groups
    │       ├── popover.tsx        # Floating content
    │       ├── pagination.tsx     # Page navigation
    │       ├── navigation-menu.tsx # Navigation menus
    │       ├── menubar.tsx        # Menu bars
    │       ├── input-otp.tsx      # One-time password input
    │       ├── hover-card.tsx     # Hover information cards
    │       ├── dropdown-menu.tsx  # Dropdown menus
    │       ├── drawer.tsx         # Bottom drawer
    │       ├── context-menu.tsx   # Right-click menus
    │       ├── command.tsx        # Command palette
    │       ├── collapsible.tsx    # Collapsible sections
    │       ├── checkbox.tsx       # Checkboxes
    │       ├── chart.tsx          # Data visualization
    │       ├── carousel.tsx       # Image/content carousels
    │       ├── calendar.tsx       # Date picker
    │       ├── breadcrumb.tsx     # Navigation breadcrumbs
    │       ├── aspect-ratio.tsx   # Responsive containers
    │       ├── toggle.tsx         # Toggle buttons
    │       ├── toggle-group.tsx   # Grouped toggles
    │       └── textarea.tsx       # Multi-line text input
    ├── hooks/
    │   ├── use-mobile.tsx         # Mobile device detection
    │   └── use-toast.ts           # Toast notification management
    ├── lib/
    │   ├── queryClient.ts         # React Query configuration
    │   └── utils.ts               # Utility functions and helpers
    ├── pages/
    │   ├── dashboard.tsx          # Main healthcare dashboard
    │   └── not-found.tsx          # 404 error page
    ├── services/
    │   └── api.ts                 # API client and data fetching
    ├── utils/
    │   └── riskCalculation.ts     # Risk assessment algorithms
    ├── App.tsx                    # Main application component
    ├── index.css                  # Global styles and Tailwind imports
    └── main.tsx                   # Application entry point
```

### Backend (Express.js + TypeScript)
```
server/
├── index.ts                        # Express server setup
├── routes.ts                       # API route definitions
├── storage.ts                      # In-memory data caching
└── vite.ts                         # Development server integration
```

### Project Root Configuration
```
├── README.md                       # Project documentation (this file)
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Locked dependency versions
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── components.json                 # Shadcn/ui component configuration
└── drizzle.config.ts               # Database ORM configuration
```

### Shared Schema & Types
```
shared/
└── schema.ts                       # Zod validation schemas and TypeScript types
```

## 🔬 Risk Assessment Algorithm

### Blood Pressure Scoring
- **Stage 2 Hypertension** (≥140/90): Risk Score 4
- **Stage 1 Hypertension** (130-139/80-89): Risk Score 3  
- **Elevated** (120-129/<80): Risk Score 2
- **Normal** (<120/<80): Risk Score 1
- **Invalid/Missing Data**: Risk Score 0

### Temperature Assessment
- **High Fever** (≥101.0°F): Risk Score 2
- **Low Fever** (99.6-100.9°F): Risk Score 1
- **Normal** (≤99.5°F): Risk Score 0

### Age-Related Risk
- **Over 65**: Risk Score 2
- **40-65 years**: Risk Score 1
- **Under 40**: Risk Score 1

### Overall Risk Classification
- **High Risk**: Total Score ≥ 4
- **Moderate Risk**: Total Score 2-3
- **Low Risk**: Total Score ≤ 1

## 🔌 API Integration

### DemoMed Healthcare API
- **Patient Data Endpoint**: `/v1/patients` - Fetches paginated patient records
- **Assessment Submission**: `/v1/submit-assessment` - Submits risk analysis results
- **Authentication**: API key-based authentication via `X-API-Key` header

### Data Validation
The application includes robust validation to handle:
- Mixed data types (string/number inconsistencies)
- Missing or null values
- Malformed blood pressure readings
- API response variations

## 🛠️ Technology Stack

### Core Technologies
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Build Tools**: Vite, ESBuild
- **Validation**: Zod schemas with runtime type checking

### UI Framework
- **Component Library**: Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for smooth transitions

### Data Management
- **API Client**: Custom fetch wrapper with retry logic
- **State Management**: TanStack Query (React Query)
- **Caching**: In-memory storage with query invalidation
- **Forms**: React Hook Form with Zod validation

## 📊 Features in Detail

### Dashboard Statistics
- **Total Patients**: Real-time count of all patients in system
- **High Risk Patients**: Count and percentage of patients with risk score ≥ 4
- **Fever Cases**: Patients with temperature ≥ 99.6°F
- **Data Quality Issues**: Patients with missing or invalid vital signs

### Patient Table Features
- **Search**: Filter by patient ID or name
- **Sorting**: Clickable column headers for data organization
- **Pagination**: Configurable page sizes (5, 10, 20 patients)
- **Risk Indicators**: Color-coded badges for easy risk identification
- **Status Badges**: Visual indicators for high risk, fever, and data quality issues

### Assessment Workflow
1. **Data Collection**: Fetch latest patient data from DemoMed API
2. **Risk Calculation**: Apply clinical algorithms to each patient
3. **Quality Analysis**: Identify data completeness and accuracy issues
4. **Results Compilation**: Generate assessment lists for submission
5. **External Submission**: Send results to evaluation endpoint
6. **Feedback Display**: Show detailed scoring and improvement suggestions

## 🔒 Security & Privacy

- **API Key Management**: Secure storage of authentication credentials
- **Data Validation**: Input sanitization and type checking
- **Error Handling**: Graceful degradation without exposing sensitive data
- **HTTPS Ready**: Secure communication protocols

## 🚦 Error Handling

### Robust Fallback System
- **API Failures**: Graceful degradation with cached data
- **Network Issues**: Automatic retry with exponential backoff
- **Data Validation Errors**: Clear user feedback and recovery options
- **External Service Outages**: Local processing capabilities

### Logging & Monitoring
- **Request Logging**: Detailed API interaction logs
- **Error Tracking**: Comprehensive error capture and reporting
- **Performance Metrics**: Response time and success rate monitoring

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript compiler
```

### Code Quality Tools
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and style enforcement
- **Prettier**: Automatic code formatting

## 📈 Performance Optimizations

- **React Query Caching**: Intelligent data caching and synchronization
- **Component Lazy Loading**: Reduced initial bundle size
- **Pagination**: Efficient handling of large datasets
- **Debounced Search**: Optimized user input handling
- **Memory Management**: Automatic cleanup of cached data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Review the troubleshooting section in this README
- Check the application logs for error details
- Ensure API credentials are properly configured
- Verify network connectivity to DemoMed services

## 📚 Additional Resources

- [DemoMed API Documentation](https://api.demomedapi.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---
