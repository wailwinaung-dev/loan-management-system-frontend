import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from '../common/Loader';
import PageTitle from '../component/PageTitle';
import Borrower from '../pages/Borrower/index';
import DefaultLayout from '../component/DefaultLayout';
import Dashboard from '../pages/Dashboard';
import AddBorrower from '../pages/Borrower/AddBorrower';
import EditBorrower from '../pages/Borrower/EditBorrower';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard" />
              <Dashboard />
            </>
          }
        />

        <Route path="/borrower" element={
          <>
            <PageTitle title="Borrowers" />
            <Borrower />
          </>
        }
        />
        <Route path="/borrower/add" element={
          <>
            <PageTitle title="Add New Borrowers" />
            <AddBorrower />
          </>
        } />
        <Route path="/borrower/edit/:id" element={
          <>
            <PageTitle title="Edit Borrowers" />
            <EditBorrower />
          </>
        } />

      </Routes>
    </DefaultLayout>
  );
}

export default App;
