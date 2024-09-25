import { DashboardClient } from "./dashboard-client/page"

async function getData() {
  // In a real application, this would be an API call
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
  }
}

export default async function AdminDashboardPage() {
  const data = await getData()
  
  return <DashboardClient initialData={data} />
}