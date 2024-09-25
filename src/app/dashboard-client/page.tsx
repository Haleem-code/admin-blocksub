  'use client'

  import React, { useState } from 'react'
  import { BarChart3, Users, CreditCard, DollarSign, Bell, Activity, Menu } from 'lucide-react'
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

  interface Platform {
    id: string
    name: string
    subscriptions: number
    revenue: number
    apiUsage: number
    tier: string
  }

  interface SubscriptionTrend {
    date: string
    count: number
  }

  interface Notification {
    id: number
    message: string
    type: string
  }

  interface DashboardData {
    totalPlatforms: number
    totalSubscriptions: number
    totalRevenue: number
    adminRevenue: number
    platforms: Platform[]
    subscriptionTrend: SubscriptionTrend[]
    notifications: Notification[]
  }

  interface DashboardClientProps {
    initialData: DashboardData
  }

  export function DashboardClient({ initialData }: DashboardClientProps) {
    const [activeTab, setActiveTab] = React.useState('overview')
    const [data, setData] = React.useState(initialData)
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = () => {
      const filteredPlatforms = initialData.platforms.filter(platform =>
        platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        platform.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setData({ ...initialData, platforms: filteredPlatforms })
    }

    return (
      <div className="flex h-screen bg-gray-900">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-gray-800 text-white">
          <div className="flex items-center justify-between p-4 border-b bg-gray-800">
            <h1 className="text-2xl font-bold">BlockSub Admin</h1>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Button
                  variant="ghost"
                  className={`w-full text-white justify-start ${activeTab === 'overview' ? '' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Overview
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full text-wjite  justify-start ${activeTab === 'platforms' ? '' : ''}`}
                  onClick={() => setActiveTab('platforms')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Platforms
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full  text-white justify-start ${activeTab === 'activity' ? '' : ''}`}
                  onClick={() => setActiveTab('activity')}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Activity
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="shadow-sm bg-gray-900">
            <div className="flex items-center justify-between p-4">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              <div className="flex items-center">
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  className="w-64 mr-2 text-white" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>Search</Button>
              </div>
              <NotificationBell notifications={data.notifications} />
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
            {activeTab === 'overview' && <OverviewTab data={data} />}
            {activeTab === 'platforms' && <PlatformsTab platforms={data.platforms} />}
            {activeTab === 'activity' && <ActivityTab data={data} />}
          </main>
        </div>
      </div>
    )
  }

  function OverviewTab({ data }: { data: DashboardData }) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Active Platforms</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.totalPlatforms}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Subscriptions</CardTitle>
              <CreditCard className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.totalSubscriptions}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${data.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Admin Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${data.adminRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-gray-900">
          <CardHeader>
            <CardTitle className="text-white">Subscription Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.subscriptionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                    labelStyle={{ color: '#D1D5DB' }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function PlatformsTab({ platforms }: { platforms: Platform[] }) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Platform List</h2>
        <div className="bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Project ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Platform Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Subscriptions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">API Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {platforms.map((platform) => (
                <tr key={platform.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{platform.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{platform.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{platform.subscriptions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">${platform.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{platform.apiUsage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{platform.tier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    <Button variant="outline" className='bg-gray-900 text-white'>Manage</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  function ActivityTab({ data }: { data: DashboardData }) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Activity Logs</h2>
        <div className="bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {data.notifications.map((notification) => (
                <tr key={notification.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{notification.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{notification.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{notification.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  function NotificationBell({ notifications }: { notifications: Notification[] }) {
    return (
      <div className="relative">
        <Bell className="h-6 w-6 text-white" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </div>
    )
  }