import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import { useLocation } from 'wouter';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useEffect, useState } from 'react';

const loginSchema = z.object({
  userName: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.'
  })
});

const Login = () => {
  const [error, setError] = useState<string>('');

  const [, setLocation] = useLocation();
  const { onLogin, auth } = useAuthStore();

  useEffect(() => {
    if (auth.loggedIn) return setLocation('/posts');
  }, [auth.loggedIn, setLocation]);

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    if (values.userName && values.password) {
      onLogin({ userName: values.userName, password: values.password }).then(
        (res) => {
          res.loggedIn
            ? setLocation('/posts')
            : setError('Invalid credentials');
        }
      );
    }
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: '',
      password: ''
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Log in
              </Button>

              {error && (
                <span className="text-sm text-red-500 text-center flex justify-center">
                  {error}
                </span>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
