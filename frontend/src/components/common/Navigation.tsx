import { Link, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Cpu, 
  Video, 
  FlaskConical, 
  Settings,
  Bug
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/run/autonomous', icon: Cpu, label: 'Autonomous' },
    { path: '/run/vision', icon: Video, label: 'Vision' },
    { path: '/run/science', icon: FlaskConical, label: 'Science' },
    { path: '/debug/autonomous', icon: Bug, label: 'Debug' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
              <Cpu className="size-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">MT11 Robot</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="size-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
