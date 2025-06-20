export default function LoadingSpinner({ message = 'Carregando...' }: { message?: string }) {
  return (
    <div className="text-sm text-gray-500 flex items-center gap-2">
      <svg className="animate-spin h-4 w-4 text-blue-500" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-2a6 6 0 110-12v2a4 4 0 100 8v-2a2 2 0 110-4v2z"
        />
      </svg>
      <span>{message}</span>
    </div>
  )
}
