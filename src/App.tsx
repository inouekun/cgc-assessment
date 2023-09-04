import { Redirect, Route } from 'wouter';
import Login from '@/pages/Login/Login';
import Navbar from '@/components/navbar/navbar';
import Posts from '@/pages/Posts/Posts';
import PostDetail from '@/pages/Posts/PostDetail';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useAuthStore();

  if (!auth.loggedIn) {
    return <Redirect to="/" />;
  }
  return <div className="container">{children}</div>;
};

const App = () => {
  return (
    <div>
      <Navbar />

      <main className="relative mt-12">
        <Route path="/" component={Login} />
        <ProtectedRoute>
          <Route path="/posts" component={Posts} />
          <Route path="/posts/:id" component={PostDetail} />
        </ProtectedRoute>
      </main>
    </div>
  );
};

export default App;
