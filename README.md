# Weekly Goals - PWA Task Tracker

A Progressive Web App for tracking weekly goals and daily tasks with a native iOS-like design. Perfect for organizing your week with daily task breakdowns for learning, coding, chores, errands, and more.

## Features

- 📱 **PWA Ready** - Add to iPhone home screen for native app experience
- 📅 **Weekly View** - Navigate between weeks and select specific dates
- ✅ **Task Management** - Create, complete, and organize daily tasks
- 🔴 **Priority Marking** - Mark important tasks with red flags
- 📋 **Categories** - Organize tasks by type (learn, code, chores, errands)
- 🔄 **Task Migration** - Move incomplete tasks to the next day
- 📊 **Progress Tracking** - Visual feedback for completed tasks
- 🎨 **iOS Design** - Native iOS-like UI components and interactions

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **PWA**: next-pwa for offline support
- **Styling**: Tailwind CSS with iOS-inspired design

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd weekly-goals
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/weekly-goals
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

- `MONGODB_URI`: Your MongoDB connection string
- `NODE_ENV`: Set to `production`

## PWA Features

- **Home Screen Installation**: Add to iPhone home screen for native app experience
- **Offline Support**: Basic offline functionality with service worker
- **App-like Navigation**: Smooth transitions and native feel
- **Responsive Design**: Optimized for mobile devices

## Usage

1. **Navigate Weeks**: Use arrow buttons to move between weeks
2. **Select Date**: Tap on any day to view/edit tasks
3. **Add Tasks**: Click "+ Add Task" to create new tasks
4. **Mark Complete**: Tap the circle to mark tasks as done
5. **Move Tasks**: Use the arrow button to move incomplete tasks to the next day
6. **Mark Important**: Toggle the important flag for priority tasks
7. **Delete Tasks**: Remove completed or unnecessary tasks

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   │   └── tasks/      # Task CRUD operations
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout with PWA meta tags
│   └── page.tsx        # Main page component
├── components/         # React components
│   ├── AddTaskModal.tsx
│   ├── TaskList.tsx
│   └── WeekView.tsx
├── lib/               # Utility functions
│   └── mongodb.ts     # Database connection
└── models/            # Mongoose models
    └── Task.ts        # Task schema
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue on GitHub or contact the maintainers.
