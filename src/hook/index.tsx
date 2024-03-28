import { AuthProvider } from './auth';

const AppProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default AppProvider;