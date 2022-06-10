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
      <p>
        <Link href="/add">
          <a href="/add" className={router.pathname === '/' ? 'active' : ''}>Add image</a>
        </Link>
      </p>
    </div>
  );
};

export default Menu;
