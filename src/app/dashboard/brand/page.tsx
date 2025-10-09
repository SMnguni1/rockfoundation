import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'
import BrandBuilder from '@/components/brand/BrandBuilder'

export default function BrandPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Brand Builder
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create your professional brand identity with AI-powered tools
            </p>
          </div>
          
          <BrandBuilder />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
