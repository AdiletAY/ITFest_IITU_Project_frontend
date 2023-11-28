import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card';
import { AuthContext } from '@/store/AuthStore.tsx';
import { appLinks } from '@/services/consts/Links.tsx';
import axios from '@/services/Axios.tsx';
import { categoryType } from '@/types/documentType.ts';

const Home = () => {

  const [categories, setCategories] = useState<categoryType[]>();
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios.get('/applications/categories/').then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen text-center max-w-[1200px] mx-auto">
      <h1 className="text-lg">Services to apply docs online</h1>

      <div
        className={`flex justify-center ${categories && categories?.length <= 3 ? 'gap-20' : 'gap-10'
          } mt-10 flex-wrap`}
      >
        {!categories?.length && (
          <span>
            Currently there is no active category
          </span>
        )}

        {categories?.map((category) => {
          const categoryTitle = category?.title
          const isUser = Boolean(auth?.user);

          return (
            <Card key={category.id}>
              <Link
                className={!isUser ? 'pointer-events-none' : undefined}
                to={`${appLinks.createApplication}${category.id}`}
              >
                <Button key={category.id} disabled={!isUser}>
                  {categoryTitle}
                </Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
