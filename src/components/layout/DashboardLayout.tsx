'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Palette, 
  Megaphone, 
  BarChart3, 
  DollarSign, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  FolderOpen
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { user, signOut } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Brand Builder', href: '/onboarding', icon: Palette },
    { name: 'Brand Kits', href: '/dashboard/brand-kit', icon: FolderOpen },
    { name: 'Campaigns', href: '/dashboard/campaigns', icon: Megaphone },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Valuation', href: '/dashboard/valuation', icon: DollarSign },
    { name: 'Investor Hub', href: '/dashboard/investor', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // You can implement actual dark mode logic here
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-800 shadow-xl">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Rock Foundation</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Rock Foundation</h1>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              )
            })}
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" />
              
              <div className="flex items-center gap-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-900 dark:text-white">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
