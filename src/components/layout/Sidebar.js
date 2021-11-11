/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';

import ToggleDarkMode from '../ToggleDarkMode';
import Spinner from '../Spinner';

import { FaGithub, FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { FiLogOut, FiLogIn, FiHome, FiDollarSign, FiUpload } from 'react-icons/fi';

export default function Navbar() {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

const { status } = useSession()

  function logIn(e) {
    e.preventDefault();
    signIn('google');
  }

  function logOut(e) {
    e.preventDefault();
    signOut();
  }

  return (
    <>
      <div className='container'>
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader >
            <div className='header-container'>
              <ToggleDarkMode />
              <div className='closeMenu-container'>
                <div className='closeMenu' onClick={menuIconClick}>
                  {menuCollapse ? <FaCaretRight /> : <FaCaretLeft />}
                </div>
              </div>
            </div>

            <Menu iconShape='square' >
              {status === 'authenticated' ? (
                <div onClick={(e) => logOut(e)}>
                  <MenuItem icon={<FiLogOut />}>Déconnexion</MenuItem>
                </div>
              ) : (
                <div onClick={(e) => logIn(e)}>
                  <MenuItem icon={<FiLogIn />}>Connexion</MenuItem>
                </div>
              )}
            </Menu>
          </SidebarHeader>

          <SidebarContent>
            <Menu iconShape='square'>
              <MenuItem active={true} icon={<FiHome />}>
                <Link href='/'>
                  <a>Accueil</a>
                </Link>
              </MenuItem>

              <MenuItem active={true} icon={<FiHome />}>
                <Link href='/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </MenuItem>

              <SubMenu title='Exercices' icon={<FiDollarSign />}>
                <MenuItem>
                  <Link href='/dashboard/fiscal-year/2021-2022'>
                    <a>2021-2022</a>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href='/dashboard/fiscal-year/2020-2021'>
                    <a>2020-2021</a>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href='/dashboard/fiscal-year/2019-2020'>
                    <a>2019-2020</a>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href='/dashboard/fiscal-year/overview'>
                    <a>Comparatif</a>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href='/dashboard/trialbalance'>
                    <a>Balance générale</a>
                  </Link>
                </MenuItem>
              </SubMenu>

              <MenuItem active={true} icon={<FiUpload />}>
                <Link href='/dashboard/tools/upload'>
                  <a>Upload</a>
                </Link>
              </MenuItem>
            </Menu>
          </SidebarContent>

          <SidebarFooter>
            <div>
              <Link href='https://github.com/yaco16/compta'>
                <a>
                  <div className='github-footer'>
                    <FaGithub />
                    {menuCollapse ? <></> : <span>GitHub</span>}
                  </div>
                </a>
              </Link>
            </div>
          </SidebarFooter>
        </ProSidebar>
        <style jsx>{`
          .container {
            position: fixed;
            top: 15%;
          }

          .header-container {
            display: flex;
          }

          .closeMenu-container {
            position: absolute;
            top: 10px;
            right: 1px;
          }

          .github-footer {
            width: 80%;
            color: #8b8a88;
            display: flex;
            justify-content: center;
            background-color: #18293f;
            font-size: 0.8rem;
            border-radius: 15px;
            padding: 0.6rem;
            margin: 0.8rem auto 0.8rem auto;
          }

          .github-footer span {
            margin-left: 0.2rem;
          }

          .github-footer:hover {
            color: #d8d8d8;
          }
        `}</style>
      </div>
    </>
  );
}
