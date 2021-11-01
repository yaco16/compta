import { useState } from 'react';
import Link from 'next/link';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';

import ToggleDarkMode from '../ToggleDarkMode';

import { FaGithub, FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import {FiLogOut, FiHome, FiDollarSign, FiUpload } from 'react-icons/fi';

export default function Navbar() {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div className='container'>
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className='header-container'>
              <ToggleDarkMode />
              <div className='closeMenu-container'>
                <div className='closeMenu' onClick={menuIconClick}>
                  {menuCollapse ? <FaCaretRight /> : <FaCaretLeft />}
                </div>
              </div>
            </div>

            <Menu iconShape='square'>
              <MenuItem icon={<FiLogOut />}>Déconnexion</MenuItem>
            </Menu>
          </SidebarHeader>

          <SidebarContent>
            <Menu iconShape='square'>
              <MenuItem active={true} icon={<FiHome />}>
                <Link href='/'>
                  <a>Accueil</a>
                </Link>
              </MenuItem>

              <SubMenu title="Stats" icon={<FiDollarSign />}>
                <MenuItem>
                <Link href='/dashboard/turnover'>
                  <a>Chiffre d'affaires</a>
                </Link>
                </MenuItem>
                <MenuItem>
                <Link href='/dashboard/trialbalance'>
                  <a>Balance générale</a>
                </Link>
                </MenuItem>
              </SubMenu>

              <MenuItem active={true} icon={<FiUpload />}>
                <Link href='/dashboard/upload'>
                  <a>Import</a>
                </Link>
              </MenuItem>
            </Menu>
          </SidebarContent>

          <SidebarFooter>
            <div>
              <Link href='https://github.com/yaco16/compta'>
                <a>
                  <div className='github'>
                    <FaGithub />

                    {menuCollapse ? <></> : <span>View Source</span>}


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
            background-color: #0c1e35;
          }

          .header-container {
            display: flex;
          }

          .closeMenu-container {
            position: absolute;
            top: 10px;
            right: 1px;
          }

          .github {
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

          .github span {
            margin-left: 0.2rem;
          }

          .github:hover {
            color: #d8d8d8;
          }
        `}</style>
      </div>
    </>
  );
}
