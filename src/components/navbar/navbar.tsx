import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useLocation } from 'wouter';

const Navbar = () => {
  const { auth, onLogout } = useAuthStore();
  const [, setLocation] = useLocation();

  const onLogoutHandler = () => {
    onLogout();
    setLocation('/');
  };

  const onHomeHandler = () => {
    setLocation('/');
  };

  return (
    <div className="flex h-12 fixed top-0 z-50 bg-blue-600 shadow-md justify-between w-full items-center  text-white">
      <div className="container flex justify-between items-center">
        <h1 className="text-lg">
          Hello, {auth.loggedIn && auth.userName ? auth.userName : 'Guest'}
        </h1>
        {auth.loggedIn && (
          <div className="flex gap-2">
            <Button onClick={onHomeHandler} variant={'secondary'} size={'sm'}>
              Home
            </Button>
            <Button
              onClick={onLogoutHandler}
              variant={'destructive'}
              size={'sm'}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
