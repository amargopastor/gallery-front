import Link from 'next/link';
import { useRouter } from 'next/router';

const Menu = () => {
  const router = useRouter();
  return (
    <div>
      <p>
        <Link href="/">
          <a href="/" className={router.pathname === '/' ? 'active' : ''}>Gallery</a>
        </Link>
      </p>
    </div>
  );
};

export default Menu;
