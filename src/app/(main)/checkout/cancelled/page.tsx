import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'
import Link from 'next/link'

const CheckoutCancelled = async () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md w-full rounded-xl bg-white p-8 text-center shadow-xl border border-gray-100">
        <div className="flex justify-center mb-6">
          <XCircle className="h-20 w-20 text-red-500" />
        </div>
        <h1 className="font-bold text-3xl text-gray-900 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. If you wish to try again, please return to your profile and restart the booking process.
        </p>
        <div className="flex justify-center">
          <Link href="/">
            <Button variant="default" className="flex items-center gap-2">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutCancelled
