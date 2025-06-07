import { Button } from '@/components/ui/button';
import LoanForm from '../components/LoanForm';

const NewTracker = async () => {
  /*   const router = useRouter(); */
  return (
    <div>
      <h1>New Tracker</h1>
      <LoanForm />
      {/*  <Button onClick={() => router.back()}>Volver</Button> */}
    </div>
  );
};

export default NewTracker;
