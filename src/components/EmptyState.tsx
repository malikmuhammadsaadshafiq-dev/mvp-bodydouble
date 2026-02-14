'use client'

interface EmptyStateProps {
  onCreateClick: () => void
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="text-center py-16 border-4 border-dashed border-black bg-white/50 dark:bg-gray-800/50 fade-in-up">
      <div className="text-6xl mb-4">👻</div>
      <h3 className="text-2xl font-black mb-2" style={{ letterSpacing: '-0.02em' }}>No rooms found</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 font-bold">Create your first focus room to get started with virtual coworking and synchronized pomodoro timers</p>
      <button
        onClick={onCreateClick}
        className="bg-[#FF6B6B] border-4 border-black font-bold uppercase px-8 py-4 shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-x-0 active:translate-y-0 transition-all"
      >
        Create Your First Room
      </button>
    </div>
  )
}