import Navigation from '@/components/common/Navigation'

const Autonomous = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-4">Autonomous Mode</h1>
        <div className="bg-card rounded-lg p-6 border border-border">
          <p className="text-muted-foreground">Autonomous navigation controls and settings will be displayed here.</p>
        </div>
      </div>
    </div>
  )
}

export default Autonomous