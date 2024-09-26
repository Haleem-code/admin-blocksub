// Import your client component
import { DashboardClient } from "../app/dashboard/page";

// Define the TypeScript types for the data
interface Platform {
  id: string;
  name: string;
  subscriptions: number;
  revenue: number;
  apiUsage: number;
  tier: string;
}

interface SubscriptionTrend {
  date: string;
  count: number;
}

interface Notification {
  id: number;
  message: string;
  type: string;
}

interface DashboardData {
  totalPlatforms: number;
  totalSubscriptions: number;
  totalRevenue: number;
  adminRevenue: number;
  platforms: Platform[];
  subscriptionTrend: SubscriptionTrend[];
  notifications: Notification[];
}

// Static data fetching function
async function getData(): Promise<DashboardData> {
  return {
    totalPlatforms: 42,
    totalSubscriptions: 1837,
    totalRevenue: 287650,
    adminRevenue: 43147.50,
    platforms: [
      { id: 'PRJ001', name: 'TechHub', subscriptions: 450, revenue: 15000, apiUsage: 89, tier: 'Pro' },
      { id: 'PRJ002', name: 'GamersUnite', subscriptions: 320, revenue: 12000, apiUsage: 76, tier: 'Basic' },
      { id: 'PRJ003', name: 'EduPortal', subscriptions: 280, revenue: 9500, apiUsage: 92, tier: 'Pro' },
      { id: 'PRJ004', name: 'HealthTrack', subscriptions: 180, revenue: 6000, apiUsage: 68, tier: 'Basic' },
    ],
    subscriptionTrend: [
      { date: '2023-01', count: 1200 },
      { date: '2023-02', count: 1350 },
      { date: '2023-03', count: 1500 },
      { date: '2023-04', count: 1650 },
      { date: '2023-05', count: 1837 },
    ],
    notifications: [
      { id: 1, message: 'TechHub is nearing API usage limit', type: 'warning' },
      { id: 2, message: 'Significant revenue increase for GamersUnite', type: 'info' },
      { id: 3, message: 'API key expired for EduPortal', type: 'error' },
    ]
  };
}

// Ensure the page is treated as static
export const dynamic = 'force-static';

export default async function AdminDashboardPage() {
  const data = await getData(); // Fetch data once statically during the build
  
  return <DashboardClient initialData={data} />;
}
