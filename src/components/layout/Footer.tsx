import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl font-bold text-black">Company Logo</span>
          </div>
          <p className="text-base text-gray-600 max-w-md">
            Your LLC taxes. Done right.
          </p>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-base text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} UnitedTax. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-900">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
