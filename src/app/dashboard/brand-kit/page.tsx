import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'
import BrandKitDashboard from '@/components/onboarding/BrandKitDashboard'

export default function BrandKitDashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Brand Kit Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and view all your generated brand kits
            </p>
          </div>
          
          <BrandKitDashboard />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
