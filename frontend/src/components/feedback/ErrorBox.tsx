export default function ErrorBox({ message }: { message: string }) {
  return (
    <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
      ⚠️ {message}
    </div>
  )
}
