import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { 
  Palette, 
  Megaphone, 
  BarChart3, 
  DollarSign, 
  Users, 
  TrendingUp,
  Target,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome to Rock Foundation</h1>
            <p className="text-blue-100 text-lg">
              Your all-in-one platform to build, grow, and scale your startup
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Palette className="h-6 w-6 text-blue-600" />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Brand Builder
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Create your professional brand identity with AI
              </p>
              <Link href="/onboarding">
                <Button className="w-full" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Megaphone className="h-6 w-6 text-green-600" />
                </div>
                <Target className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Campaign Generator
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Launch cross-platform marketing campaigns
              </p>
              <Button className="w-full" size="sm" variant="outline">
                Create Campaign
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Track performance and growth metrics
              </p>
              <Button className="w-full" size="sm" variant="outline">
                View Analytics
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Valuation Engine
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Get AI-powered company valuation
              </p>
              <Button className="w-full" size="sm" variant="outline">
                Calculate Value
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4">
                  <Palette className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Brand kit generated successfully
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mr-4">
                  <Megaphone className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    New campaign created
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1 day ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg mr-4">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Analytics report updated
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    3 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
