import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { lightTheme } from '../style/theme.config';

const Overlay = styled.div`
  display:flex;
  justify-content: space-around;
  height:50px;
  margin: 20px
`;

const Parraf = styled.p`
  margin: 0;
`;

const Anchor = styled.a`
  font-size: 1.2em;
  text-decoration: none;
  color: ${(props) => (props.className ? lightTheme.main : lightTheme.accent)};
  font-size: ${(props) => (props.className ? '2.3em' : props.className)};
  transition: color .3s ease-in-out, box-shadow .3s, font-size .3s ease-in-out;
    &:hover{
      color: ${lightTheme.main};
      cursor: pointer;
    };
`;

const Menu = () => {
  const router = useRouter();
  return (
    <Overlay>
      <Parraf>
        <Link href="/">
          <Anchor href="/" className={router.pathname === '/' ? 'active' : ''}>Gallery</Anchor>
        </Link>
      </Parraf>
      <Parraf>
        <Link href="/add">
          <Anchor href="/add" className={router.pathname === '/add' ? 'active' : ''}>Add image</Anchor>
        </Link>
      </Parraf>
    </Overlay>
  );
};

export default Menu;
